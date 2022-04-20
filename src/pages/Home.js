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


    function renderPost(post) {
        let image_url = "https://swe-tastebuds.s3.amazonaws.com/Posts/" + post["id"];
        // setComments([]);
        let dbComment = [];
        let newComments = [];
        console.log(comments);

        const itemRows = [];
        for (let item of comments) {
            if (item.post_id === post["id"]) {
                const row = (
                    <div>
                        <p> <b> {item.username}</b>: {item.comment} </p>
                    </div>
                );
                itemRows.push(row);
            }
        }

        comments.map((c) => {
            if (c.post_id === post["id"]) {
                dbComment.push(c.comment);
            }
        })


        return (
            <div>

                <img src={image_url} />
                <p>{post["caption"]}</p>
                See what others said! <p>{itemRows}</p>
                <form method="POST" action="/upload_comment">
                    <input type="hidden" name="post_id" value={post["id"]} />
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