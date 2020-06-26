import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import './Landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {user:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleSubmit(evt) {
        // evt.preventDefault();
        let url = `/user/${this.state.user}`
        this.props.history.push(url);
        
    }
    render() {
        return(
            <div className='Landing'>
                <h1 className='Landing-heading'>Git-Space</h1>
                <form className='Landing-form' onSubmit={this.handleSubmit}>
                    <InputGroup className="mb-3">
                        <FormControl
                            id='input'
                            placeholder="FIND GITHUB USER"
                            name="user"
                            value={this.state.user}
                            onChange={this.handleChange}
                            aria-label="Find github users..."
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button id='btn' onClick={this.handleSubmit} variant="outline-light">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>
            </div>
        )
    }
}

export default withRouter(Landing);