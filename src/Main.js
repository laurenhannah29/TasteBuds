import React from 'react';
import { Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';

const Main = () => {
    return (
        <Router> {/* The swtich decides which component to show based on the current url */}
            <Route path='/' componenet={Home}></Route>
            <Route exact path='signup' componenet={Signup}></Route>
            as
        </Router>
    );
}

export default Main;