//import { uid } from 'uid';

export default class Music {
    /**
     * 
     * @param {string} title
     * @param {string} artist
     * @param {string} album
     * @param {string} genre
     */
    constructor(title, artist, album, genre) {
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.genre = genre;
        //this._id = uid(24);
    }
}