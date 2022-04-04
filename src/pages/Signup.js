import React from 'react';
import { Link } from 'react-router-dom';

console.log("SIGNUP");
const Signup = () => {
    return (
        <Link to="/home">
            <button variant="outlined">
                Home
            </button>
        </Link>
    );
}

export default Signup;