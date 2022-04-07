import React from 'react';
import { Link } from 'react-router-dom';
import ImageUploader from "react-images-upload";

const NewPost = () => {
    function onClickSave() {
        fetch('/save_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(val),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });
    }

    return (
        <div>
            Create a Post!!

            <ImageUploader
                withIcon={false}
                withPreview={true}
                buttonText="Choose images"
                onChange={this.onDrop}
                imgExtension={[".jpeg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
            />

            <label>Caption
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </label>

            <button onClick={onClickSave}>Save Post</button>

        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default NewPost;