import React, { useState, useEffect } from 'react';
import { SavedPost } from '../components/SavedPost';

const Saved = () => {
    const [saves, setSaves] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch("/load_saved")
            .then(response => response.json())
            .then(data => {
                setSaves(data["saves"]);
                setUser(data["user"]);
            })
    }, []);

    function renderSaved(saved) {
        return (
            <SavedPost image={saved["image"]} caption={saved["caption"]} />
        )
    }

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