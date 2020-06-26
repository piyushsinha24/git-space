import React, { Component } from 'react'
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Profile from './Profile';
import Stats from './Stats';
import Repos from './Repos';
import './User.css';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {data:{}, totalStars:'', totalForks:'', reposStarred:'', reposForked:'', language:'', events:'', isLoading: true, error: false};
    }

    count(arr) {
      var a = [], b = [], prev;
      arr.sort();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }
      return [a, b];
    }

    async componentDidMount() {
        const url = `https://api.github.com/users/${this.props.match.params.id}`;
        const username = process.env.REACT_APP_GITHUB_CLIENT_ID;
        const password = process.env.REACT_APP_GITHUB_SECRET_ID;
        let response = await axios.get(url, {
            auth: { username: `${username}`, password: `${password}` }
          }).catch(()=>{
            this.setState({error: true});
          });
        
        let response2 = await axios.get(url+'/repos?per_page=100', {
            auth: { username: `${username}`, password: `${password}` }
          });

        let response3 = await axios.get(url+'/events', {
          auth: { username: `${username}`, password: `${password}` }
        });

        let events =  response3.data;
        
        let reposStarred = [...response2.data];
        let reposForked = [...response2.data];
        let stars = 0;
        let forks = 0;
        let language = [];
        reposStarred.forEach(element => {
            stars = stars + element.stargazers_count;
            forks = forks + element.forks;
            if(element.language != null) {
              language.push(element.language);
            }
        });
        function compareStars( a, b ) {
            if ( a.stargazers_count < b.stargazers_count ){
              return 1;
            }
            if ( a.stargazers_count > b.stargazers_count ){
              return -1;
            }
            return 0;
          }
          function compareForks( a, b ) {
            if ( a.forks < b.forks ){
              return 1;
            }
            if ( a.forks > b.forks ){
              return -1;
            }
            return 0;
          }  
          
        reposStarred.sort( compareStars );
        reposForked.sort( compareForks );
        let result = this.count(language);

        this.setState({data: response.data, totalStars: stars, totalForks: forks, reposStarred: reposStarred,reposForked: reposForked, language: result, events: events, isLoading: false});
    }
    render() {
        return(
            this.state.isLoading? this.state.error? 
            <Container id='error'>
                <div id='error-msg'>
                  <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> User not found. <a href='/'>Try Again</a>
                </div>
            </Container>:
            <Container id='loading'>
                <Spinner animation="grow" variant="light" />
            </Container> :
            <div>
              <Navbar style={{backgroundColor: 'rgb(39, 41, 61)'}}>
                <Navbar.Brand style={{color: 'white', fontSize: '30px', letterSpacing: '3px'}} href="/">Git-Space</Navbar.Brand>
              </Navbar>
              <Container>
                <Profile data={this.state.data} stars={this.state.totalStars} forks={this.state.totalForks} languages={this.state.language}/>
                <Stats lang={this.state.language} events={this.state.events} reposStarred={this.state.reposStarred} reposForked={this.state.reposForked}/>
                <Repos repos={this.state.reposStarred}/>
              </Container>
              <div className='footer'>
                <p style={{backgroundColor: 'rgb(39, 41, 61)', fontSize: '18px'}}>Made with <i className="fa fa-heart text-danger"></i> by <a href='https://github.com/piyushsinha24'>@piyushsinha24</a></p>
                </div>
            </div>
            
            
        )
    }
}

export default User;