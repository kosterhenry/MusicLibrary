import { useState, useEffect } from 'react';
import MusicItem from './MusicItem';
import { FaSort } from "react-icons/fa";

function MusicCollection({ musics, onDelete, onEdit }) {
    const [sortedMusics, setSortedMusics] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchQuery, setSearchQuery] = useState({ title: "", artist: "", album: "", genre: "" });

    // Initialize sortedMusics with musics when the component first loads
    useEffect(() => {
        setSortedMusics(musics);
    }, [musics]);

    // Sorting function
    const sortBy = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sorted = [...sortedMusics].sort((a, b) => {
            if (a[key].toLowerCase() < b[key].toLowerCase()) return direction === 'asc' ? -1 : 1;
            if (a[key].toLowerCase() > b[key].toLowerCase()) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setSortedMusics(sorted);
    };

    // Handle search input changes
    const handleSearchChange = (key, value) => {
        setSearchQuery(prevState => ({ ...prevState, [key]: value }));
    };

    // Filtered music list based on search queries
    const filteredMusics = sortedMusics.filter(music =>
        music.title.toLowerCase().includes(searchQuery.title.toLowerCase()) &&
        music.artist.toLowerCase().includes(searchQuery.artist.toLowerCase()) &&
        music.album.toLowerCase().includes(searchQuery.album.toLowerCase()) &&
        music.genre.toLowerCase().includes(searchQuery.genre.toLowerCase())
    );

    return (
        <table>
            <thead>
                {/* Sorting Row */}
                <tr>
                    <th onClick={() => sortBy('title')}>Title <FaSort /></th>
                    <th onClick={() => sortBy('artist')}>Artist <FaSort /></th>
                    <th onClick={() => sortBy('album')}>Album <FaSort /></th>
                    <th onClick={() => sortBy('genre')}>Genre <FaSort /></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {/* Search Row */}
                <tr>
                    <th><input type="text" placeholder="Search Title Here" onChange={(e) => handleSearchChange('title', e.target.value)} /></th>
                    <th><input type="text" placeholder="Search Artist Here" onChange={(e) => handleSearchChange('artist', e.target.value)} /></th>
                    <th><input type="text" placeholder="Search Album Here" onChange={(e) => handleSearchChange('album', e.target.value)} /></th>
                    <th><input type="text" placeholder="Search Genre Here" onChange={(e) => handleSearchChange('genre', e.target.value)} /></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredMusics.map((music, i) => (
                    <MusicItem music={music} onDelete={onDelete} onEdit={onEdit} key={i} />
                ))}
            </tbody>
        </table>
    );
}

export default MusicCollection;