import React from 'react';

class NewPost extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         image: null
    //     };

    //     this.onImageChange = this.onImageChange.bind(this);
    // }

    state = {
        image: null
    };

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            console.log(img);
            this.setState({
                image: URL.createObjectURL(img)
            });
            console.log(this.state.value)

        }
    };

    onClickPost = () => {
        const blob_image = new Blob([this.state.image], { type: 'text/plain' })
        const formData = new FormData();
        formData.append(
            "image",
            blob_image,
            this.state.name
        );

        fetch("/upload", {
            method: "POST",
            body: formData
        });
    }


    render() {
        return (
            <div>
                <div>
                    <div>
                        <form method="POST" action="/save_post">
                            <img src={this.state.image} name="myImage" />
                            <div>
                                <input
                                    name="caption"
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <h1>Select Image</h1>
                            <input type="file" onChange={this.onImageChange} />
                            <button type="submit" onClick={this.onClickPost}>Post!</button>
                        </form>

                    </div>

                </div>
            </div>
        );
    }
}
export default NewPost;