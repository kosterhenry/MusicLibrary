import mongoose from 'mongoose';
import 'dotenv/config';

const CONCERT_DB_NAME = 'concert_db';
const CONCERT_COLLECTION = 'concerts';
const CONCERT_CLASS = 'Concert';

let connection = undefined;
let Concert = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {dbName: CONCERT_DB_NAME});
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Concert = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){
    const concertSchema = mongoose.Schema({
        artist: {type: String, required: true},
        concert: {type: String, required: true},
        date: {type: String, required: true, 
            validate: {
                validator: function (value) {
                    // Validate MM-DD-YY format
                    return /^\d{2}-\d{2}-\d{2}$/.test(value);
                },
                message: 'Date must be in MM-DD-YY format.',
            },
        },


    });
    return mongoose.model(CONCERT_CLASS, concertSchema);
}

/**
 * Create a concert
 * @param {string} artist
 * @param {string} concert
 * @param {string} date

 * @returns
 */

async function createConcert(artist, concert, date){
    try{
        const newConcert = new Concert({artist: artist, concert: concert, date: date});
        return newConcert.save();
    } catch (err) {
        console.error("error saving concert:", err);
        throw err;
    }
}

async function getAllConcert(){
    return await Concert.find({});
}

async function findConcertID(_id){

    const query = Concert.findById(_id);
    return query.exec();
}

async function updateConcert(_id, toUpdate){
    const result = await Concert.findByIdAndUpdate({_id: _id}, {$set: toUpdate});
    return result
}

async function deleteConcertByID(_id){
    const result = await Concert.deleteOne({_id: _id});
    return result.deletedCount;
}



export { connect, createConcert, getAllConcert, findConcertID, updateConcert, deleteConcertByID};
