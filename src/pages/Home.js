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
        console.log(post["url"]);
        let image_url = "https://swe-tastebuds.s3.amazonaws.com/Posts/" + post["id"];
        return (
            <div class="post">
                <img src={image_url} />
                <p>Caption: {post["caption"]}</p>
            </div>
        )
    }
    console.log(posts);

    return (
        <div class="App">
            <div class="home">TasteBuds</div>
            {posts.map((post) => renderPost(post))}
        </div >

    );
}

export default Home;