import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Stats.css';

class Stats extends Component {
    bgColor = [
        "rgba(123, 13, 255, 0.7)",
        "rgba(171, 36, 247, 0.7)",
        "rgba(155, 110, 243, 0.4)",
        "rgba(198, 128, 250, 0.6)",
        "rgba(117, 221, 221, 0.8)",
        "rgba(36, 196, 207, 0.8)",
        "rgba(0, 146, 203, 0.8)",
        "rgba(104, 106, 253, 1)",
        "rgba(155, 110, 243, 1)",
        "rgba(209,188,249,1)",
        "rgba(209,118,229,1)"
    ]; 

    render() {
        let data = [];
        for (let i = 0; i < this.props.lang[0].length; i++) {
            if(this.props.lang[0][i]!= null) {
                data[i] = {
                    title: `${this.props.lang[0][i]}: ${this.props.lang[1][i]}`,
                    value: this.props.lang[1][i],
                    color: this.bgColor[i]
                };
            } 
        }
        let data2 = [];
        let starredRepo = this.props.reposStarred.slice(0,6);
        for (let i = 0; i < starredRepo.length; i++) {
                data2[i] = {
                    title: `${starredRepo[i].name}: ${starredRepo[i].stargazers_count}`,
                    value: starredRepo[i].stargazers_count,
                    color: this.bgColor[i]
                };
        }
        let data3 = [];
        let forkedRepos = this.props.reposForked.slice(0,6);
        for (let i = 0; i < forkedRepos.length; i++) {
            data3[i] = {
                title: `${forkedRepos[i].name}: ${forkedRepos[i].forks}`,
                value: forkedRepos[i].forks,
                color: this.bgColor[i]
            };
        }
        let events = this.props.events.slice(0,5);
        return(
            <div>
                 <Row>
                    <Col xs={12} md={4}>
                    <h1 style={{marginTop: '22px'}}>Top Languages</h1>
                        <Row>
                        <Col xs={12} md={12}> 
                            <PieChart className='chart' key='lang'
                             data={data}
                            // label={({ dataEntry }) => dataEntry.title}
                             />
                        </Col>
                        </Row>
                         {data.map(function(lang){
                            return <div className='chart-div' style={{backgroundColor: `${lang.color}`, color: `white`, padding: '2px'}}>{lang.title}</div>
                        })}
                    </Col>
                    <Col xs={12} md={4}>
                    <h1 style={{marginTop: '22px'}}>Most Starred</h1>
                        <Row>
                        <Col xs={12} md={12}> 
                            <PieChart className='chart' key='lang'
                             data={data2}
                            // label={({ dataEntry }) => dataEntry.title}
                             />
                        </Col>
                        </Row>
                         {data2.map(function(lang){
                            return <div className='chart-div' style={{backgroundColor: `${lang.color}`, color: `white`, padding: '2px'}}>{lang.title}</div>
                        })}
                    </Col>
                    <Col xs={12} md={4}>
                    <h1 style={{marginTop: '22px'}}>Most Forked</h1>
                        <Row>
                        <Col xs={12} md={12}> 
                            <PieChart className='chart' key='lang'
                             data={data3}
                            // label={({ dataEntry }) => dataEntry.title}
                             />
                        </Col>
                        </Row>
                         {data3.map(function(lang){
                            return <div className='chart-div' style={{backgroundColor: `${lang.color}`, color: `white`, padding: '2px'}}>{lang.title}</div>
                        })}
                    </Col>
                    <Col xs={12} md={12}>
                    <h1 style={{marginTop: '22px'}}>Recent Activity</h1>
                        {events.map(function(event){
                            return <p style={{backgroundColor: 'rgb(39, 41, 61)', padding: '8px'}}><i className="fa fa-plus"></i>&nbsp;{event.type} <p>{event.payload.ref_type} in <a href={`https://github.com/${event.repo.name}`}>{event.repo.name}</a></p></p>
                        })}
                    </Col>
                 </Row>
            </div>
        )
    }
}
export default Stats;