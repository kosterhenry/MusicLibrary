import 'dotenv/config';
import * as musicModel from './music_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

function validateRequestBody(body) {
    const allowedProperties = ['title', 'artist', 'album', 'genre'];

    const bodyKeys = Object.keys(body);
    if (bodyKeys.length !== allowedProperties.length || !bodyKeys.every(key => allowedProperties.includes(key))) {
        return false;
    }

    // Validate individual properties
    const { title, artist, album, genre } = body;

    if (typeof title !== 'string' || title.trim().length === 0) {
        return false;
    }
    if (typeof artist !== 'string' || artist.trim().length === 0) {
        return false;
    }
    if (typeof album !== 'string' || album.trim().length === 0) {
        return false;
    }
    if (typeof genre !== 'string' || genre.trim().length === 0) {
        return false;
    }


    return true;
}

app.listen(PORT, async () => {
    await musicModel.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body.
 */

app.post('/musics', asyncHandler(async (req, res) => {
    const isValid = validateRequestBody(req.body);

    if (!isValid) {
        return res.status(400).json({ Error: 'Invalid request' });
    }

    const {title, artist, album, genre} = req.body;

    const newMusic = await musicModel.createMusic(title, artist, album, genre);
    res.status(201).json(newMusic);

}));

app.get('/musics', asyncHandler(async (req, res) => {

    const music = await musicModel.getAllMusic();

    res.status(200).json(music);
}));

app.get('/musics/:_id', asyncHandler(async (req, res) => {

    const {_id} = req.params;

    const MusicID = await musicModel.findMusicID(_id)


    if (MusicID){
        return res.status(200).json(MusicID);
    }

    res.status(404).json({"Error": "Not found"});

}));

app.put('/musics/:_id', asyncHandler(async (req, res) => {

    const {_id} = req.params;
    const isValid = validateRequestBody(req.body);
    const toUpdate = req.body;

    if (!isValid) {
        return res.status(400).json({Error: 'Invalid request'})
    } 

    const updatedMusic = await musicModel.updateMusic(_id, toUpdate);

    if(!updatedMusic){
        return res.status(404).json({"Error": "Not found"});
    }

    res.status(200).json(updatedMusic);
}));

app.delete('/musics/:_id', asyncHandler(async (req, res) => {

    const {_id} = req.params;
    const MusicID = await musicModel.findMusicID(_id)


    if (!MusicID){
        return res.status(404).json({"Error": "Not found"});
    }
    
    const deleted = await musicModel.deleteMusicByID(_id);

    res.status(204).send();
}));
