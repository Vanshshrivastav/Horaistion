const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a sub-schema for anime trailers
const AnimeTrailerSchema = new Schema({
    title: { type: String },
    url: { type: String }
});

// Define a sub-schema for characters, accommodating different voice actor field names
const CharacterSchema = new Schema({
    name: { type: String, required: true },
    character_image: { type: String },
    // Voice actor fields from animeMovies.json and some maindata.json
    japanese_voice_actor: { type: String },
    english_voice_actor: { type: String },
    voice_actor_image: { type: String },
    // Voice actor fields from main_characters in maindata.json
    japanese_va: { type: String },
    english_va: { type: String },
    va_image: { type: String },
    // Voice actor fields from other character formats in maindata.json
    voice_actor_jp: { type: String },
    voice_actor_en: { type: String }
});

// Main schema for TV series and movies
const MediaSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, enum: ['TV Series', 'Movie', 'OVA'] },
    name: { type: String, required: true },
    image: { type: String },
    duration: { type: String },
    total_episodes: { type: Number },
    aired_episodes: { type: Number },
    genres: [String],
    status: { type: String },
    rating: { type: String },
    studios: [String],
    producers: [String],
    aired: { type: String },
    story: { type: String },
    synopsis: { type: String },
    animeTrailer: [AnimeTrailerSchema],
    characters: [CharacterSchema],
    main_characters: [CharacterSchema]
});


const MovieSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, enum: ['Movie'] },
    name: { type: String, required: true },
    image: { type: String },
    duration: { type: String },
    total_episodes: { type: Number },
    aired_episodes: { type: Number },
    genres: [String],
    status: { type: String },
    rating: { type: String },
    studios: [String],
    producers: [String],
    aired: { type: String },
    story: { type: String },
    synopsis: { type: String },
    animeTrailer: [AnimeTrailerSchema],
    characters: [CharacterSchema],
    main_characters: [CharacterSchema]
});


const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
   conformPassword: String
});

const Media = mongoose.model('Media', MediaSchema, 'media');
const Mov = mongoose.model('Mov', MovieSchema, 'mediaMovie');
const userModel = mongoose.model('userModel', userSchema, 'Signup');



module.exports = {
    Media,
    userModel,
    Mov
};