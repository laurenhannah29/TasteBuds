import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post } from '../components/Post.js';

const Home = () => {
    const [val, setVal] = useState([])
    const posts = val.map(
        (post, i) => <Post
            image={post.image}
            caption={post.caption}
        />);

    useEffect(() => {
        fetch('/get_post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setVal(data);
            });
    }, []);

    return (
        <div>
            Home page
            {posts}
        </div>

    );
}

export default Home;