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

    setBioToState({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    passBioCloseTextArea() {
        this.props.passBioTwo(this.state.bio);
        this.setState({
            showTextField: !this.state.showTextField
        });
    }

    render () {
        let bio = this.props.bio ? `${this.props.bio}. Edit` : 'Add your bio now';
        return (
            <div style={{backgroundColor: 'brown'}}>
                <p onClick={() => this.toggleTextArea()}>{bio}</p>
                {this.state.showTextField && (
                    <div>
                        <textarea onChange={e => this.setBioToState(e)} rows='4' cols='50' placeholder='Write your bio here...' name='bio'></textarea>
                        <button onClick={() => this.passBioCloseTextArea()}>Save</button>
                    </div>
                )}
            </div>

        );

    }
}


export default BioEditor;
