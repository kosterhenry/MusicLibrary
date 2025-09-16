import '../App.css';
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useState } from "react";

function MusicItem({ music, onDelete, onEdit }) {
    const [tooltip, setTooltip] = useState({ text: "", x: 0, y: 0, visible: false });
    const [lyrics, setLyrics] = useState(""); 
    const [showLyrics, setShowLyrics] = useState(false);
    const [artistInfo, setArtistInfo] = useState(null);
    const [showArtistPopup, setShowArtistPopup] = useState(false);

    const showTooltip = (text, event) => {
        setTooltip({
            text,
            x: event.clientX,
            y: event.clientY,
            visible: true
        });
    };

    const hideTooltip = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };

    const fetchLyrics = async () => {
        try {
            const response = await fetch(`/get-lyrics?title=${encodeURIComponent(music.title)}&artist=${encodeURIComponent(music.artist)}`);
            const data = await response.json();
            
            if (response.ok) {
                setLyrics(data.lyrics);
            } else {
                setLyrics("Lyrics not found.");
            }
            
            setShowLyrics(true);
        } catch (error) {
            setLyrics("Error fetching lyrics.");
            setShowLyrics(true);
        }
    };

    const fetchArtistInfo = async () => {
        try {
            const response = await fetch(`/get-artist-info?artist=${encodeURIComponent(music.artist)}`);
            const data = await response.json();

            if (response.ok) {
                setArtistInfo(data);
            } else {
                setArtistInfo({ bio: "Artist information not found.", topSongs: [] });
            }
            
            setShowArtistPopup(true);
        } catch (error) {
            setArtistInfo({ bio: "Error fetching artist information.", topSongs: [] });
            setShowArtistPopup(true);
        }
    };

    return (
        <>
            <tr>
                <td>
                    <a 
                        href="/" 
                        onClick={e => { e.preventDefault(); fetchLyrics(); }}
                        onMouseMove={e => showTooltip("Click to view lyrics", e)}
                        onMouseLeave={hideTooltip}
                    >
                        {music.title}
                    </a>
                </td>
                <td>
                    <a
                        href="/"
                        onClick={e => { e.preventDefault(); fetchArtistInfo(); }}
                        onMouseMove={e => showTooltip("Click to view artist info", e)}
                        onMouseLeave={hideTooltip}
                    >
                        {music.artist}
                    </a>
                </td>
                <td>{music.album}</td>
                <td>{music.genre}</td>
                <td>
                    <a 
                        href="/" 
                        onClick={e => { e.preventDefault(); onEdit(music); }}
                        onMouseMove={e => showTooltip("Click here to edit the track", e)}
                        onMouseLeave={hideTooltip}
                    >
                        <MdEdit />
                    </a>
                </td>
                <td>
                    <a 
                        href="/" 
                        onClick={e => { e.preventDefault(); onDelete(music._id); }}
                        onMouseMove={e => showTooltip("Delete permanently from database. This cannot be undone.", e)}
                        onMouseLeave={hideTooltip}
                    >
                        <MdDeleteForever />
                    </a>
                </td>
            </tr>

            {tooltip.visible && (
                <div 
                    className="tooltip-box" 
                    style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
                >
                    {tooltip.text}
                </div>
            )}

            {showLyrics && (
                <div className="lyrics-popup">
                    <div className="lyrics-content">
                        <h3>Lyrics for {music.title}</h3>
                        <pre>{lyrics}</pre>
                        <button onClick={() => setShowLyrics(false)}>Close</button>
                    </div>
                </div>
            )}

            {showArtistPopup && artistInfo && (
                <div className="artist-popup">
                    <div className="artist-content">
                        <h3>{music.artist}</h3>
                        <p>{artistInfo.bio}</p>
                        <h4>Top 5 Songs:</h4>
                        <ul>
                            {artistInfo.topSongs.map((song, index) => (
                                <li key={index}>{song}</li>
                            ))}
                        </ul>
                        <button onClick={() => setShowArtistPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default MusicItem;