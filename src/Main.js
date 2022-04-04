import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';

const Main = () => {
    return (
        <Routes> {/* The swtich decides which component to show based on the current url */}
            <Route exact path='/' componenet={Home}></Route>
            <Route exact path='signup' componenet={Signup}></Route>
        </Routes>
    );
}

export default Main;