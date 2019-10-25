import React, { Component } from 'react';

class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            showTextField: false
        };
    }

    toggleTextArea() {
        this.setState({
            showTextField: !this.state.showTextField
        });
    }


    render () {
        let bio = this.props.bio ? `${this.props.bio}. Edit` : 'Add your bio now';
        return (
            <div style={{backgroundColor: 'brown'}}>
                <p onClick={() => this.toggleTextArea()}>{bio}</p>
                {this.state.showTextField && (<textarea rows='4' cols='50'></textarea>)}
            </div>

        );

    }
}


export default BioEditor;
