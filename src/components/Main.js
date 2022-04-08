import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Saved from '../pages/Saved';
import NewPost from '../pages/NewPost';

const Main = () => {
    return (
        <Routes> {/* The swtich decides which component to show based on the current url */}
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/NewPost' element={<NewPost />} />
        </Routes>
    );
}

export default Main;