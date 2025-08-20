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

app.listen(6002, () => {

    console.log("server start!")
})