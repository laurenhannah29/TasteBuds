import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import EditProfile from '../pages/EditProfile';
import Saved from '../pages/Saved';
import NewPost from '../pages/NewPost';

const Main = () => {
    return (
        <Routes> {/* The swtich decides which component to show based on the current url */}
            <Route path='/' element={<Home />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/NewPost' element={<NewPost />} />
            <Route path='/EditProfile' element={<EditProfile />} />
        </Routes>
    );
}

export default Main;