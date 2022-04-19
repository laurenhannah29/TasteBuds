import React, { useState, useEffect } from 'react';
import { SavedPost } from '../components/SavedPost';

const Saved = () => {
    const [saves, setSaves] = useState([]);
    const [username, setUsername] = useState([]);
    const [authenticated, setAuthenticated] = useState([]);

    useEffect(() => {
        fetch("/load_saved")
            .then(response => response.json())
            .then(data => {
                setSaves(data["saves"]);
                //setUser(data["user"]);
            })
        fetch("/is_authenticated")
            .then(response => response.json())
            .then(data => {
                setAuthenticated(data["is_authenticated"])
                setUsername(data["username"])
            })
    }, []);

    function renderSaved(saved) {
        let image_url = "https://swe-tastebuds.s3.amazonaws.com/Posts/" + saved["post_id"];

        return (
            <div>
                <img src={ image_url } />
                <p>{saved["caption"]}</p>
            </div>
        )
    }

    console.log(username, authenticated);
    return (
        <div>
            <h1>Saved page</h1>
            <div>
                {saves.map((saved) => renderSaved(saved))}
            </div>

            <form method="POST" action="/upload">
                <button type="submit">Upload</button>
            </form>
        </div>

    );
}

export default Saved;