// import React from 'react';
// import { useState, useEffect } from 'react';
import { Post } from '../components/Post.js'; //create post page
import React, { useState, useEffect } from "react";
import Data from "../components/Data.js";
import Buttons from "../components/Buttons.js";
import PostBlocks from '../components/PostBlocks.js';

const Home = () => {
    const [posts, setPosts] = useState([])

    // ---------------------------------------------------------------------

    const [post, setPost] = useState(Data);

    const blogPosts = [...new Set(Data.map((value) => value.category))];
  
    const filterPost = (sumn) => {
      const newPost = Data.filter((newValue) => {
        return newValue.category === sumn;
      });
      setPost(newPost);
    };

    //----------------------------------------------------------------------

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
            <div>
        <div>
          {/* <h1>Filtering Posts Page</h1> */}
          <Buttons
            filterPost={filterPost}
            setPost={setPost}
            blogPosts={blogPosts}
          />
          <PostBlocks post={post} />
        </div>
      </div>
            {posts.map((post) => renderPost(post))}
        </div>

    );
}

export default Home;