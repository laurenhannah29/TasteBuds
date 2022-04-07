import logo from './logo.svg';
import './App.css';
import Main from './components/Main.js';
import Navbar from './components/Navbar.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Signup from './pages/Signup';
import Profile from './pages/Profile';


function App() {
  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
