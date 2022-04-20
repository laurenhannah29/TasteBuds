import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            navbar
            <li><Link to="/">Home</Link></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/Nutrition">Nutrition</a></li>
            <li><Link to="/saved">Saved</Link></li>
            {/* Maybe some logic to determine what is in here such logout or login */}
            <li><Link to="/NewPost">Create a Post!!!</Link></li>
            <li><Link to="/Appliance">See what I just added</Link></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/logout">Logout</a></li>
        </div>
    )
}

export default Navbar;