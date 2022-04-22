import { Post } from '../components/Post.js'; //create post page
import { SaveButton } from '../components/SaveButton.js'
import { useState, useEffect } from "react";



const Home = () => {
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [nationality, setNationality] = useState("Clear");

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

    function onNationalityChange(e) {
        setNationality(e.target.value);
    }

    function onClickSave(e) {
        const formData = new FormData();
        formData.append("post_id", e.target.value);
        console.log(e.target.value);
        javascript: alert('Post Saved');
        fetch("/save_post", {
            method: "POST",
            body: formData
        });
    }


    function renderPost(post) {
        let image_url = "https://swe-tastebuds.s3.amazonaws.com/Posts/" + post["id"];

        let dbComment = [];
        let newComments = [];

        const itemRows = [];
        for (let item of comments) {
            if (item.post_id === post["id"]) {
                const row = (
                    <div class="comment">
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


        // if filter is clear render all posts
        if (nationality === "Clear") {
            return (
                <div>
                    <img src={image_url} />
                    <h3>{post["title"]}</h3>
                    <p>{post["caption"]}</p>
                    <SaveButton value={post["id"]} onClick={onClickSave} />

                    <div class="com"> See what others said! </div> <p>{itemRows}</p>
                    <form method="POST" action="/upload_comment">
                        <input type="hidden" name="post_id" value={post["id"]} />
                        <input type="text" id="textboxid" name="comment" placeholder="Leave a comment" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
        }

        // filter is something then show posts only under that filter
        if (post["nationality"] === nationality) {
            return (
                <div>
                    <img src={image_url} />
                    <h3>Title: {post["title"]}</h3>
                    <p>Caption: {post["caption"]}</p>
                    <SaveButton value={post["id"]} onClick={onClickSave} />

                    <div class="com"> See what others said! </div>
                    <p>{itemRows}</p>
                    <form method="POST" action="/upload_comment">
                        <input type="hidden" name="post_id" value={post["id"]} />
                        <input type="text" id="textboxid" name="comment" placeholder="Leave a comment" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
        }
        // if not under filter, dont render the post
        return;
    }

    return (
        <div>
            <div>
                <div class="App">
                    <div class="home">
                        TasteBuds
                    </div>
                    <div>
                        <label>
                            <input type="radio"
                                id="cuisine1"
                                name="nationality"
                                value="Chinese"
                                onChange={onNationalityChange}
                            />
                            Chinese
                        </label>
                        <label>
                            <input type="radio"
                                name="nationality"
                                value="Indian"
                                onChange={onNationalityChange}
                            />
                            Indian
                        </label>
                        <label>
                            <input type="radio"
                                name="nationality"
                                value="Italian"
                                onChange={onNationalityChange}
                            />
                            Italian
                        </label>
                        <label>
                            <input type="radio"
                                name="nationality"
                                value="American"
                                onChange={onNationalityChange}
                            />
                            American
                        </label>
                        <label>
                            <input type="radio"
                                name="nationality"
                                value="Mexican"
                                onChange={onNationalityChange}
                            />
                            Mexican
                        </label>
                        <label>
                            <input type="radio"
                                name="nationality"
                                value="Clear"
                                onChange={onNationalityChange}
                            />
                            Clear
                        </label>
                    </div>
                </div>
                {posts.map((post) => renderPost(post))}
            </div>
        </div>
    );
}

export default Home;