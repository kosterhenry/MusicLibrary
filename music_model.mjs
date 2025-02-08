import mongoose from 'mongoose';
import 'dotenv/config';

const MUSIC_DB_NAME = 'music_db';
const MUSIC_COLLECTION = 'musics';
const MUSIC_CLASS = 'Music';

let connection = undefined;
let Music = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {dbName: MUSIC_DB_NAME});
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Music = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){
    const musicSchema = mongoose.Schema({
        title: {type: String, required: true},
        artist: {type: String, required: true},
        album: {type: String, required: true},
        genre: {type: String, required: true},


    });
    return mongoose.model(MUSIC_CLASS, musicSchema);
}

/**
 * Create an exercise
 * @param {string} title
 * @param {string} artist
 * @param {string} album
 * @param {string} genre

 * @returns
 */

async function createMusic(title, artist, album, genre){
    try{
        const newMusic = new Music({title: title, artist: artist, album: album, genre: genre});
        return newMusic.save();
    } catch (err) {
        console.error("error saving music:", err);
        throw err;
    }
}

async function getAllMusic(){
    return await Music.find({});
}

async function findMusicID(_id){

    const query = Music.findById(_id);
    return query.exec();
}

async function updateMusic(_id, toUpdate){
    const result = await Music.findByIdAndUpdate({_id: _id}, {$set: toUpdate});
    return result
}

async function deleteMusicByID(_id){
    const result = await Music.deleteOne({_id: _id});
    return result.deletedCount;
}



export { connect, createMusic, getAllMusic, findMusicID, updateMusic, deleteMusicByID};
