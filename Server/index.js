const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Media, userModel, Mov } = require('./Model/schema');

const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://localhost:27018/maindata')

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

app.get('/Signup', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/Signup', async (req, res) => {
    const { fullname, email, password, conformPassword } = req.body;
    const newUser = await userModel.create({ fullname, email, password, conformPassword });
    res.status(201).json(newUser);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email, password });
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.delete('/media/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let deleted = await Media.findByIdAndDelete(id);
        if (!deleted) {
            deleted = await Mov.findByIdAndDelete(id);
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

app.post('/addMedia', async (req, res) => {
    try {
        const { title, description, mediaType, genre, releaseYear, imageUrl, videoUrl, characters } = req.body;

        // Find the highest ID to generate a new one
        const lastMedia = await Media.findOne().sort({ id: -1 });
        const lastMov = await Mov.findOne().sort({ id: -1 });
        const lastId = Math.max(lastMedia ? lastMedia.id : 0, lastMov ? lastMov.id : 0);
        const newId = lastId + 1;

        const genres = genre.split(',').map(g => g.trim());

        let newMedia;
        const mediaData = {
            id: newId,
            name: title,
            story: description,
            synopsis: description,
            genres: genres,
            aired: releaseYear.toString(),
            image: imageUrl,
            animeTrailer: [{ title: 'Trailer', url: videoUrl }],
            characters: characters, // Add characters to mediaData
            main_characters: characters, // Also add to main_characters if needed
            status: 'Finished Airing', // Example default
            rating: 'N/A', // Example default
        };

        if (mediaType === 'movie') {
            mediaData.type = 'Movie';
            newMedia = new Mov(mediaData);
        } else if (mediaType === 'tv show') {
            mediaData.type = 'TV Series';
            newMedia = new Media(mediaData);
        } else if (mediaType === 'anime') {
            mediaData.type = 'TV Series';
            newMedia = new Media(mediaData);
        } else {
            return res.status(400).json({ message: 'Invalid media type' });
        }

        await newMedia.save();
        res.status(201).json(newMedia);
    } catch (error) {
        console.error('Error adding media:', error);
        res.status(500).json({ message: 'Failed to add media', error: error.message });
    }
});

app.listen(6002, () => {

    console.log("server start!")
})