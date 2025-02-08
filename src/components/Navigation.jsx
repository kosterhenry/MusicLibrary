import {Link} from 'react-router-dom'

function Navigation(){
    return (
        <nav className="app-nav">
            <Link to="/">Home </Link>
            <Link to="/create-music">Add Track</Link>
            <Link to="/music-library">Music Library</Link>
        </nav>
    )
}

export default Navigation;