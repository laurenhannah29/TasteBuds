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
    }

    // state = {
    //     image: null,
    //     caption: ""
    // };

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            console.log(img);
            this.setState({ file: img });
            this.setState({ image: URL.createObjectURL(img) });
            console.log(this.state.value)
        }
    };

    onCaptionChange = event => {
        this.setState({ caption: event.target.value })
    };

    onClickPost = () => {
        const blob_image = new Blob([this.state.image], { type: "application/octet-stream" });
        const blob_caption = new Blob([this.state.caption], { type: 'text/plain' });


        const formData = new FormData();
        formData.append("image", blob_image, this.state.name);
        formData.append("caption", blob_caption, "caption");
        formData.append("file", this.state.file);

        console.log(blob_image);
        console.log(JSON.stringify({ image: this.state.image, caption: this.state.caption, file: this.state.file }));

        fetch("/save_post", {
            method: "POST",
            // headers: { 'Content-Type': 'application/json' },
            body: formData
            // body: JSON.stringify({ image: this.state.image, caption: this.state.caption })
        });
    }


    render() {
        return (
            <div>
                <div>
                    <div>
                        {/* <form method="POST" action="/save_post">
                            <img src={this.state.image} name="myImage" />
                            <div>
                                <input
                                    name="caption"
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.onCaptionChange}
                                    accept='image/*'
                                />
                            </div>
                            <h1>Select Image</h1>
                            <input type="file" onChange={this.onImageChange} />
                            <button type="submit" onClick={this.onClickPost}>Post!</button>
                        </form> */}

                        <img src={this.state.image} name="myImage" />
                        <div>
                            <input
                                name="caption"
                                type="text"
                                value={this.state.caption}
                                onChange={this.onCaptionChange}
                                accept='image/*'
                            />
                        </div>
                        <h1>Select Image</h1>
                        <input type="file" onChange={this.onImageChange} />
                        <button type="submit" onClick={this.onClickPost}>Post!</button>

                    </div>

                </div>
            </div>
        );
    }
}
export default NewPost;