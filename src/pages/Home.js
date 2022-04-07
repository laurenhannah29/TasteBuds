import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    const posts = val.map(
        (post, i) => <Post
            image={Post.image}
            caption={Post.caption}
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