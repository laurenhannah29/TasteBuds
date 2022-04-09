import React from 'react';

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
                            <button type="submit">Post!</button>
                        </form>

                    </div>

                </div>
            </div>
        );
    }
}
export default NewPost;