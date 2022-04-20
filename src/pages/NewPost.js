import React, { Component } from 'react';

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            file: null,
            title: "",
            caption: "",
            nationality: ""
        };

        this.onImageChange = this.onImageChange.bind(this);
        this.onCaptionChange = this.onCaptionChange.bind(this);
        this.onNationalityChange = this.onNationalityChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({ file: img });
            this.setState({ image: URL.createObjectURL(img) });
        }
    };

    onTitleChange = event => {
        this.setState({ title: event.target.value })
    };

    onCaptionChange = event => {
        this.setState({ caption: event.target.value })
    };

    onNationalityChange = event => {
        this.setState({ nationality: event.target.value });
    };

    onClickPost = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("caption", this.state.caption)
        formData.append("nationality", this.state.nationality)
        formData.append("title", this.state.title)

        let success = false;
        await fetch("/upload_post", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => success = data["success"]);

        // redirect to home page if fetch returns true
        if (success) {
            window.location.replace("/");
        }
        else {
            alert("Error saving post!");
        }
    }

    render() {
        return (
            <div class="App">
                <div>
                    <div>
                        <img src={this.state.image} name="myImage" />
                        <form onSubmit={this.onClickPost}>
                            <div>
                                <div>
                                    <label>
                                        <input type="radio"
                                            id="cuisine1"
                                            name="nationality"
                                            value="Chinese"
                                            onChange={this.onNationalityChange}
                                        />
                                        Chinese
                                    </label>
                                    <label>
                                        <input type="radio"
                                            name="nationality"
                                            value="Indian"
                                            onChange={this.onNationalityChange}
                                        />
                                        Indian
                                    </label>
                                    <label>
                                        <input type="radio"
                                            name="nationality"
                                            value="Italian"
                                            onChange={this.onNationalityChange}
                                        />
                                        Italian
                                    </label>
                                    <label>
                                        <input type="radio"
                                            name="nationality"
                                            value="American"
                                            onChange={this.onNationalityChange}
                                        />
                                        American
                                    </label>
                                    <label>
                                        <input type="radio"
                                            name="nationality"
                                            value="Mexican"
                                            onChange={this.onNationalityChange}
                                        />
                                        Mexican
                                    </label>
                                </div>
                                <div>
                                    Title
                                    <input
                                        name="title"
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.onTitleChange}
                                        placeholder="title"
                                    // required
                                    />
                                </div>
                                <div>
                                    Caption
                                    <input
                                        name="caption"
                                        type="text"
                                        value={this.state.caption}
                                        onChange={this.onCaptionChange}
                                        placeholder="Caption"
                                    // required
                                    />
                                </div>
                            </div>
                            <h1>Select Image</h1>
                            <input type="file" onChange={this.onImageChange} accept='image/*' />
                            <button type="submit">Post!</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewPost;