import React, { Component } from 'react';

class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            showTextField: false
        };
    }


    render () {
        let bio = this.props.bio || 'Add your bio now';
        return (
            <div style={{backgroundColor: 'brown'}}>
                <a href="" onClick={this.props.modal}>{bio}</a>
                {this.state.showTextField && (<textarea></textarea>)}
            </div>

        );

    }
}


export default BioEditor;
