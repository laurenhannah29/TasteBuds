import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div>
            Sign up page
            <Link to="/home">
                <button variant="outlined">
                    Home
                </button>
            </Link>
        </div>
    );
}

export default Signup;