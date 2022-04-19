import React from 'react';
import { useState, useEffect } from 'react';
import { Post } from '../components/Post.js'; //create post page

const Home = () => {
    const [posts, setPosts] = useState([])
    const [comment, setComments] = useState([])

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

        fetch('/load_comment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setComments(data);
            });
    }, []);

    function renderPost(post) {
        console.log(post["url"]);
        let image_url = "https://swe-tastebuds.s3.amazonaws.com/Posts/" + post["id"];
        return (
            <div>
                <input type="hidden" name="post_id" value={post["id"]} />
                <img src={image_url} />
                <p>{post["caption"]}</p>
                <form method="POST" action="/upload_comment">
                    <input type="text" name="comment" placeholder="Leave a comment" />
                    <input type="submit" value="Submit" />
                </form>
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