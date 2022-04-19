import React from 'react';
import { useState, useEffect } from 'react';
import { Post } from '../components/Post.js'; //create post page

const Home = () => {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])

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

    function renderComment(comment) {
        return (
            <div>
                {/* <p>{comment["comment"]}</p> */}
            </div>
        )

    }

    function renderPost(post) {
        console.log(post["url"]);
        let image_url = "https://swe-tastebuds.s3.amazonaws.com/Posts/" + post["id"];
        // setComments([]);
        let newComments = [];
        for (const comment of comments) {
            if (comment["post_id"] === post["id"]) {
                newComments.push(comment["comment"]);
            }
            console.log("xkjfd")

        }
        newComments.push()
        // setComments(newComments);


        return (
            <div>
                <input type="hidden" name="post_id" value={post["id"]} />
                <img src={image_url} />
                <p>{post["caption"]}</p>
                <form method="POST" action="/upload_comment">
                    <input type="text" name="comment" placeholder="Leave a comment" />
                    <input type="submit" value="Submit" />
                </form>
                {/* {comments.map((comment) => renderComment(comment))} */}
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