import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";

class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null
        };

        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };


    render() {
        return (
            <div>
                <div>
                    <div>
                        <form method="POST" action="/save_post">
                            <img src={this.state.image} />
                            <div>
                                <input
                                    name="caption"
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <h1>Select Image</h1>
                            <input type="file" name="myImage" onChange={this.onImageChange} />
                            <button type="submit">Post!</button>
                        </form>

                    </div>

                </div>
            </div>
        );
    }
}
export default NewPost;