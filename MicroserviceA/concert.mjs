//import { uid } from 'uid';

export default class Concert {
    /**
     * 
     * @param {string} artist
     * @param {string} concert
     * @param {string} date
     */
    constructor(artist, concert, date) {
        this.artist = artist;
        this.concert = concert;
        this.date = date;
        //this._id = uid(24);
    }
}