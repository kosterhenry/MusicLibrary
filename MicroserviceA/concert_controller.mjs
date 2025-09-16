import 'dotenv/config';
import * as concertModel from './concert_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

function validateRequestBody(body) {
    const allowedProperties = ['artist', 'concert', 'date'];

    const bodyKeys = Object.keys(body);
    if (bodyKeys.length !== allowedProperties.length || !bodyKeys.every(key => allowedProperties.includes(key))) {
        return false;
    }

    // Validate individual properties
    const { artist, concert, date } = body;

    if (typeof artist !== 'string' || artist.trim().length === 0) {
        return false;
    }
    if (typeof concert !== 'string' || concert.trim().length === 0) {
        return false;
    }
    const dateRegex = /^\d{2}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return false;
    }


    return true;
}

app.listen(PORT, async () => {
    await concertModel.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

/**
 * Create a new exercise with the artist, concert, and date provided in the body.
 */

app.post('/concerts', asyncHandler(async (req, res) => {
    const isValid = validateRequestBody(req.body);

    if (!isValid) {
        return res.status(400).json({ Error: 'Invalid request' });
    }

    const {artist, concert, date} = req.body;

    const newConcert = await concertModel.createConcert(artist, concert, date);
    res.status(201).json(newConcert);

}));

app.get('/concerts', asyncHandler(async (req, res) => {

    const concert = await concertModel.getAllConcert();

    res.status(200).json(concert);
}));

app.get('/concerts/:_id', asyncHandler(async (req, res) => {

    const {_id} = req.params;

    const ConcertID = await concertModel.findConcertID(_id)


    if (ConcertID){
        return res.status(200).json(ConcertID);
    }

    res.status(404).json({"Error": "Not found"});

}));

app.put('/concerts/:_id', asyncHandler(async (req, res) => {

    const {_id} = req.params;
    const isValid = validateRequestBody(req.body);
    const toUpdate = req.body;

    if (!isValid) {
        return res.status(400).json({Error: 'Invalid request'})
    } 

    const updatedConcert = await concertModel.updateConcert(_id, toUpdate);

    if(!updatedConcert){
        return res.status(404).json({"Error": "Not found"});
    }

    res.status(200).json(updatedConcert);
}));

app.delete('/concerts/:_id', asyncHandler(async (req, res) => {

    const {_id} = req.params;
    const ConcertID = await concertModel.findConcertID(_id)


    if (!ConcertID){
        return res.status(404).json({"Error": "Not found"});
    }
    
    const deleted = await concertModel.deleteConcertByID(_id);

    res.status(204).send();
}));
