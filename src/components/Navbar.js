import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            navbar
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>

            {/* Maybe some logic to determine what is in here such logout or login */}

            <li>
                <Link to="/signup">Login</Link>
            </li>
        </div>
    )
}

export default Navbar;