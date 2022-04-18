import React, { Component } from 'react';

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            file: null,
            caption: ""
        };

        this.onImageChange = this.onImageChange.bind(this);
        this.onCaptionChange = this.onCaptionChange.bind(this);
        this.onCaptionChange = this.onCaptionChange.bind(this);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({ file: img });
            this.setState({ image: URL.createObjectURL(img) });
        }
    };

    onCaptionChange = event => {
        this.setState({ caption: event.target.value })
    };

    onClickPost = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("caption", this.state.caption)

        let success = false;
        await fetch("/save_post", {
            method: "POST", 
            body: formData
        })
        .then(response => response.json())
        .then(data => success = data["success"]);
        
        // redirect to home page if fetch returns true
        if(success){
            window.location.replace("/");
        }
        else{
            alert("Error saving post!");
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <img src={this.state.image} name="myImage" />
                        <form onSubmit={this.onClickPost}>
                            <div>
                                <input
                                    name="caption"
                                    type="text"
                                    value={this.state.caption}
                                    onChange={this.onCaptionChange}
                                    accept='image/*'
                                    // required
                                />
                            </div>
                            <h1>Select Image</h1>
                            <input type="file" onChange={this.onImageChange}  />
                            <button type="submit">Post!</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default NewPost;