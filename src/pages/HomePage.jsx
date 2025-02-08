import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ImMusic } from "react-icons/im";

function HomePage() {
    return (
        <div>
            <header>
                <h1>Music Library Home Page </h1>
            </header>
            <footer>
                <ImMusic  size= {200}/>
            </footer>
        </div>
    );

}

export default HomePage;