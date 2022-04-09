import React from 'react';
import { useState, useEffect } from 'react';
import { Post } from '../components/Post.js'; //create post page

const Home = () => {
    const [posts, setPosts] = useState([])
    // const posts = val.map(
    //     (post, i) => <Post
    //         image={post.image}
    //         caption={post.caption}
    //     />);

    useEffect(() => {
        fetch('/get_post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            });
    }, []);

    function renderPost(post) {
        return (
            <div>
                <img src={post["image"]} />
                <p>{post["caption"]}</p>
            </div>
        )
    }
    console.log(posts);

    return (
        <div>
            Home page
            {posts.map((post) => renderPost(post))}
        </div>

    );
}

export default Home;