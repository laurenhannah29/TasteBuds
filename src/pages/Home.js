import { Post } from '../components/Post.js'; //create post page
import { useState, useEffect } from "react";


const Home = () => {
    const [posts, setPosts] = useState([]);
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
    }, []);

    function onNationalityChange(e) {
        setNationality(e.target.value);
    }


    function renderPost(post) {
        let image_url = "https://swe-tastebuds.s3.amazonaws.com/Posts/" + post["id"];

        // if filter is clear render all posts
        if (nationality === "Clear") {
            return (
                <div>
                    <img src={image_url} />
                    <h3>{post["title"]}</h3>
                    <p>{post["caption"]}</p>
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