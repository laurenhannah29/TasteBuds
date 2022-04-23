import React, { useState, useEffect } from 'react';

function Saved() {
  const [saves, setSaves] = useState([]);

  useEffect(() => {
    fetch('/load_saved')
      .then((response) => response.json())
      .then((data) => {
        setSaves(data.saves);
      });
  }, []);

  function renderSaved(saved) {
    const imageUrl = `https://swe-tastebuds.s3.amazonaws.com/Posts/${saved.post_id}`;

    return (
      <div className="App">
        <img src={imageUrl} alt="missing" />
        <p>{saved.caption}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Saved page</h1>
      <div>
        {saves.map((saved) => renderSaved(saved))}
      </div>
    </div>

  );
}

export default Saved;
