const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a sub-schema for voice actors
const VoiceActorSchema = new Schema({
    japanese_voice_actor: { type: String, required: true },
    english_voice_actor: { type: String, required: true },
    voice_actor_image: { type: String, required: true }
});

// Define a sub-schema for characters
const CharacterSchema = new Schema({
    name: { type: String, required: true },
    character_image: { type: String, required: true },
    voice_actor: VoiceActorSchema
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
    genres: [{ type: String }],
    status: { type: String },
    rating: { type: String },
    studios: [{ type: String }],
    producers: [{ type: String }],
    aired: { type: String },
    story: { type: String },
    characters: [CharacterSchema],
    synopsis: { type: String }, // For items that have synopsis instead of story
    main_characters: [CharacterSchema] // For items with main_characters
});

// Schema for spotlight items
const SpotlightSchema = new Schema({
    spotlight: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true }
});

// Schema for users (for login functionality)
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const Media = mongoose.model('Media', MediaSchema);
const Spotlight = mongoose.model('Spotlight', SpotlightSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    Media,
    Spotlight,
    User
};
