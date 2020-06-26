import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Profile extends Component {
    getDate() {
        let date = new Date(this.props.data.created_at);
        let d = date.toString();
        let res = d.substring(4, 15);
        return res;
    }
    render() {
        let langCount = this.props.languages[0].length;
        return(
            <div>
                <Jumbotron className='header'>
                    <Row>
                        <Col xs={12} md={6}>
                            <Image id='img' src={this.props.data.avatar_url} rounded />
                        </Col>
                        <Col xs={12} md={6}>
                            <h1>{this.props.data.name}</h1>
                            <h2>{this.props.data.bio}</h2>
                            <h2><i className="fa fa-envelope-o" aria-hidden="true"></i> {this.props.data.email}</h2>
                            {this.props.data.blog!==''?<h2><i className="fa fa-globe" aria-hidden="true"></i> {this.props.data.blog}</h2>:''}
                            <h2><i className="fa fa-map-marker" aria-hidden="true"></i> &nbsp;{this.props.data.location}</h2>
                        </Col>
    
                    </Row>
                </Jumbotron>
                <Jumbotron className='small-header'>
                    <p><i className="fa fa-calendar"></i>&nbsp;&nbsp;Joined github on {this.getDate()}</p>
                    <p><i className="fa fa-archive"></i>&nbsp;&nbsp;Since have created {this.props.data.public_repos} repositories</p>
                    <p><i className="fa fa-code"></i>&nbsp;&nbsp;Using {langCount} different languages</p>
                </Jumbotron>
            </div>
        )
    }
}

export default Profile;