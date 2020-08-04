import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './Repos.css';

class Repos extends Component {
    render() {
        let topRepos = this.props.repos.slice(0,6);
        return(
            <div style={{marginBottom: '60px'}}>
                <h1 style={{marginTop: '22px'}}>Popular Repositories</h1>
                <Row>
                {topRepos.map(function(repo, index){
                    return <Col xs={12} md={4} key={index} style={{marginTop: '22px'}}>
                    <Card className= 'card h-100' style={{backgroundColor: 'rgb(39, 41, 61)' , color: 'white'}}>
                        <Card.Body>
                            <Card.Title>{repo.name}/{repo.language}</Card.Title>
                            <Card.Subtitle className="mb-2">
                                <i className="fa fa-star-o"></i>&nbsp;{repo.stargazers_count}&nbsp;&nbsp;
                                <i className="fa fa-code-fork"></i>&nbsp;{repo.forks}
                            </Card.Subtitle>
                            <Card.Text>
                                {repo.description}
                            </Card.Text>
                            <Card.Link  style={{ border: '1px solid white', color: 'white', padding: '4px'}} href={repo.html_url}><i className="fa fa-github"></i> Visit</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>;
                  })}
                </Row>
            </div>
        )
    }
}
export default Repos;
