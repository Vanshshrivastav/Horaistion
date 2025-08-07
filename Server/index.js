const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Media,Spotlight,User,Mov} = require('./Model/schema');



const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://localhost:27018/maindata')

app.get('/media', async (req, res) => {
    const med = await Media.find()
    res.json(med)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/movie', async (req, res) => {
    const mov = await Mov.find()
    res.json(mov)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/user', async (req, res) => {
   const spo = await Spotlight.find()
   res.json(spo)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.listen(6002, ()=>{

    console.log("server start!")
})