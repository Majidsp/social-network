import React, { Component } from 'react';
import axios from '../../axios';
import Camera from '../Camera/Camera';

class Uploader extends Component {
    constructor() {
        super();
        this.state = {
            camera: false
        };
    }

    componentDidMount() {
        // console.log('Uploader did mount Here is Uploader Component!');
    }

    fileSelected(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    upload() {
        var fd = new FormData();
        fd.append('image', this.state.file);
        axios.post('/upload', fd)
            .then(({ data }) => {
                this.props.setUrl(data[0].profile_pic_url);
            })
            .catch(err => {
                console.error(err);
                this.setState({ error: true });
            });
    }

    showCamera() {
        this.setState({
            camera: !this.state.camera
        });
    }


    render () {
        return (
            <div className="uploader">
                {/*    <h1 onClick={() => this.props.sthToTest('Arash')}>Uploader Here!</h1> */}
                <h1>Uploader Here!</h1>
                {this.state.error && ( <div className="error">Something went wrong. Please try again!</div> )}
                <input type="file" accept="image/*" onChange={(e) => this.fileSelected(e)} name="file" id="file" />
                <button className="example_c" onClick={() => this.upload()}>Upload!</button>
                <button className="example_c" onClick={() => this.showCamera()}>Take a picture!</button>
                {this.state.camera && ( <Camera modal={() => this.showCamera()} setUrlCamera={this.props.setUrl} /> )}

            </div>
        );
    }
}


export default Uploader;
