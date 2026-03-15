const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Media, userModel, Mov, Review } = require('./Model/schema');

const app = express();
const JWT_SECRET = 'your_super_secret_jwt_key_here'; // In production, use environment variables!
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/maindata');

// Auth Middleware
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

const adminAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
    });
};

// Routes
app.get('/media', async (req, res) => {
    try {
        const media = await Media.find();
        const movies = await Mov.find();
        res.json([...media, ...movies]);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/movie', async (req, res) => {
    try {
        const mov = await Mov.find();
        res.json(mov);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/Signup', adminAuth, async (req, res) => {
    try {
        const users = await userModel.find({ role: { $ne: 'admin' } });
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/Signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({ 
            fullname, 
            email, 
            password: hashedPassword,
            conformPassword: hashedPassword,
            role: email.includes('admin') ? 'admin' : 'user'
        });
        
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === 'admin@gmail.com' && password === 'admin123') {
            const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
            return res.json({ success: true, token, email, fullname: 'Administrator', role: 'admin' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role || (user.email.includes('admin') ? 'admin' : 'user') },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            success: true, 
            token, 
            email: user.email, 
            fullname: user.fullname,
            role: user.role || (user.email.includes('admin') ? 'admin' : 'user')
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/admin/media/:id', adminAuth, async (req, res) => {
    try {
        let item = await Media.findById(req.params.id);
        if (!item) {
            item = await Mov.findById(req.params.id);
        }
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ success: false, message: 'Media not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err });
    }
});

app.put('/admin/media/:id', adminAuth, async (req, res) => {
    try {
        const { 
            name, synopsis, type, genres, aired, image, animeTrailer,
            status, rating, duration, total_episodes, aired_episodes, studios, producers 
        } = req.body;

        const updateData = {
            name, story: synopsis, synopsis, type, genres, aired, image, animeTrailer,
            status, rating, duration, total_episodes, aired_episodes, studios, producers
        };

        let updated = await Media.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updated) {
            updated = await Mov.findByIdAndUpdate(req.params.id, updateData, { new: true });
        }

        if (updated) {
            res.json({ success: true, message: 'Media updated successfully', data: updated });
        } else {
            res.status(404).json({ success: false, message: 'Media not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

app.delete('/media/:id', adminAuth, async (req, res) => {
    try {
        let deleted = await Media.findByIdAndDelete(req.params.id);
        if (!deleted) {
            deleted = await Mov.findByIdAndDelete(req.params.id);
        }
        if (deleted) {
            res.json({ success: true, message: 'Media deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Media not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err });
    }
});

app.post('/addMedia', adminAuth, async (req, res) => {
    try {
        const { 
            title, description, mediaType, genre, releaseYear, imageUrl, videoUrl, characters,
            duration, totalEpisodes, airedEpisodes, status, rating, studios, producers 
        } = req.body;
        
        const lastMedia = await Media.findOne().sort({ id: -1 });
        const lastMov = await Mov.findOne().sort({ id: -1 });
        const lastId = Math.max(lastMedia ? lastMedia.id : 0, lastMov ? lastMov.id : 0);
        const newId = lastId + 1;

        const genres = genre.split(',').map(g => g.trim());
        const studiosArr = studios ? studios.split(',').map(s => s.trim()) : [];
        const producersArr = producers ? producers.split(',').map(p => p.trim()) : [];

        const mediaData = {
            id: newId,
            name: title,
            story: description,
            synopsis: description,
            genres: genres,
            aired: releaseYear.toString(),
            image: imageUrl,
            animeTrailer: [{ title: 'Trailer', url: videoUrl }],
            characters: characters,
            main_characters: characters,
            status: status || 'Finished Airing',
            rating: rating || 'N/A',
            duration: duration || '',
            total_episodes: parseInt(totalEpisodes) || 0,
            aired_episodes: parseInt(airedEpisodes) || 0,
            studios: studiosArr,
            producers: producersArr
        };

        let newMedia;
        if (mediaType === 'movie') {
            mediaData.type = 'Movie';
            newMedia = new Mov(mediaData);
        } else {
            mediaData.type = 'TV Series';
            newMedia = new Media(mediaData);
        }

        await newMedia.save();
        res.status(201).json(newMedia);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add media', error: error.message });
    }
});

app.get('/watchlist/:email', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user.watchlist || []);
    } catch (err) {
        res.status(500).json({ message: "Error fetching watchlist", error: err });
    }
});

app.post('/watchlist/add', auth, async (req, res) => {
    const { email, mediaId, mediaType, name, image } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.watchlist.some(item => item.mediaId === mediaId)) {
            return res.status(400).json({ message: "Already in watchlist" });
        }
        user.watchlist.push({ mediaId, mediaType, name, image });
        await user.save();
        res.json({ success: true, message: "Added to watchlist", watchlist: user.watchlist });
    } catch (err) {
        res.status(500).json({ message: "Error adding to watchlist", error: err });
    }
});

app.post('/watchlist/remove', auth, async (req, res) => {
    const { email, mediaId } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        user.watchlist = user.watchlist.filter(item => item.mediaId !== mediaId);
        await user.save();
        res.json({ success: true, message: "Removed from watchlist", watchlist: user.watchlist });
    } catch (err) {
        res.status(500).json({ message: "Error removing from watchlist", error: err });
    }
});

app.get('/reviews/:mediaId', async (req, res) => {
    try {
        const reviews = await Review.find({ mediaId: req.params.mediaId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reviews", error: err });
    }
});

app.post('/reviews/add', auth, async (req, res) => {
    const { mediaId, userEmail, userName, comment, rating } = req.body;
    try {
        const newReview = new Review({ mediaId, userEmail, userName, comment, rating });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: "Error adding review", error: err });
    }
});

app.delete('/reviews/:id', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ success: false, message: "Review not found" });

        // Security check: Only author or Admin can delete
        if (req.user.role !== 'admin' && req.user.email !== review.userEmail) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this review" });
        }

        await Review.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting review", error: err });
    }
});

app.get('/all-reviews', adminAuth, async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error fetching all reviews", error: err });
    }
});

// User Profile & Security Routes
app.post('/change-password', auth, async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        const user = await userModel.findOne({ email });
        
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Current password incorrect" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        user.password = hashedPassword;
        user.conformPassword = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update password", error: err.message });
    }
});

app.get('/reviews/user/:email', auth, async (req, res) => {
    try {
        const reviews = await Review.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user reviews", error: err });
    }
});

app.get('/admin/stats', adminAuth, async (req, res) => {
    try {
        const mediaCount = await Media.countDocuments();
        const movieCount = await Mov.countDocuments();
        const userCount = await userModel.countDocuments({ role: { $ne: 'admin' } });
        const reviewCount = await Review.countDocuments();
        res.json({
            totalMedia: mediaCount + movieCount,
            totalUsers: userCount,
            totalReviews: reviewCount,
            movies: movieCount,
            series: mediaCount
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching stats", error: err });
    }
});

app.listen(6002, () => {
    console.log("server start on port 6002");
});