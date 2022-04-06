import React, { useState, useEffect } from 'react';

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

    console.log(saves);
    return (
        <div>
            Saved page
        </div>

    );
}

export default Saved;