import React from 'react';
import './index.css';
import { Card, CardActions, CardText, CardTitle, Button} from 'react-mdl';
import {SelectField, Option} from 'react-mdl-extra';
import firebase from 'firebase';
import "firebase/firestore";
//import City from './data/wa.js'

class Resources extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            items: [],
            eventTag:'',
            //eventCity:'',
            eventOrg:''
        };
    
    }
    componentDidMount() {
        var postRef = firebase.database().ref('channel/event');
            postRef.on('value', (snapshot) => {
                var postArray = []; //could also do this processing in render
                snapshot.forEach(function(child){
                    
                        var message = child.val();
                        message.key = child.key; //save the unique id for later
                        postArray.push(message); //make into an array
                
                });
                
                postArray.sort((a,b) => b.time - a.time); //reverse order
                this.setState({items:postArray});
            });
    }

    handleETag(e) {
        //e.preventDefault();
        this.setState({eventTag: e});
        var postRef = firebase.database().ref('channel/event');
            postRef.on('value', (snapshot) => {
                var postArray = []; //could also do this processing in render
                snapshot.forEach(function(child){
                    if (e === child.val().eTag) {
                        var message = child.val();
                        message.key = child.key; //save the unique id for later
                        postArray.push(message); //make into an array
                    }
                });
                
                postArray.sort((a,b) => b.time - a.time); //reverse order
                this.setState({items:postArray});
            });
        
    }
    handleEOrg(e) {
        this.setState({eventOrg: e});
        var postRef = firebase.database().ref('channel/event');
            postRef.on('value', (snapshot) => {
                var postArray = []; //could also do this processing in render
                snapshot.forEach(function(child){
                    if (e === child.val().userId) {
                        var message = child.val();
                        message.key = child.key; //save the unique id for later
                        postArray.push(message); //make into an array
                    }
                });
                
                postArray.sort((a,b) => b.time - a.time); //reverse order
                this.setState({items:postArray});
            });
        
    }
    handleETime(e) {
        this.setState({eventTime: e});
        var postRef = firebase.database().ref('channel/event');
            postRef.on('value', (snapshot) => {
                var postArray = []; //could also do this processing in render
                snapshot.forEach(function(child){       
                        var message = child.val();
                        message.key = child.key; //save the unique id for later
                        postArray.push(message); //make into an array
                });
                
                postArray.sort(function(a,b) {
                    a = a.eDate.split('/');
                    b = b.eDate.split('/');
                    var aDate = new Date(a[2], a[0], a[1]);
                    var bDate = new Date(b[2], b[0], b[1]);
                    if (e === 'C') {
                        return aDate.getTime() - bDate.getTime();
                    } else {
                        return bDate.getTime() - aDate.getTime();
                    }
                    // return a.localeCompare(b);         // <-- alternative 
                  });
                  this.setState({items:postArray});
            });
        
    }

  render() {
    return (


        <div className='center'>
            <h2>Events</h2>
            <div id='center' >

                {/*<City/>*/}
                <div id='center' >
                <SelectField label={'Categories'} value={this.state.eventTag} onChange={(e) => this.handleETag(e)}>
                    <Option value={1}>Educational</Option>
                    <Option value={2}>Legal</Option>
                    <Option value={3}>Social</Option>
                    <Option value={4}>Other</Option>
                </SelectField>
               
                    
                <SelectField label={'Organizations'} value={this.state.eventOrg} onChange={(e) => this.handleEOrg(e)}>
                    <Option value='Dr6QtXWIFDVI8LPJ8M1NnlVca4k2'>University of Washington</Option>
                    <Option value='NHXvcYwIUyaEQaH1KaR9tLj8cm13'>Ethinic Cultural Community</Option> 
                    <Option value='FZdn5VEklTbuYw8uPYHIBw0vnNk2'>Latino/a Educational Achievement Project</Option>
                    <Option value='0qjkZfVUEKMXH0G6u1AGW0a6n0o1'>Northwest Immigrant Rights Project</Option>
                    <Option value='mg1RLR7acdXzI7Lk3ZwXjV2KERI2'>Latino Community Fund</Option>
                    <Option value='TJB7rNatnQNMtIh1WDoMSCH0Mih2'>21 Progress</Option>
            
                </SelectField>
                <SelectField label={'Date'} value={this.state.eventTime} onChange={(e) => this.handleETime(e)}>
                    <Option value='C'>Closest Date</Option>
                    <Option value='F'>Furthest Date</Option> 
                </SelectField>
            </div>
            </div>
            {this.state.items.map((item) => { return (
                                  
                <div id='card'>

                    <Card id='post' >
                        <CardTitle id='cardTitle' style={{ background: item.img+' center / cover #46B6AC'}}>

                        {item.eName}</CardTitle>
                        <CardText>
                            {item.eDescr}
                            <br/><br/>
                            <b>Email:</b> {item.eEmail}
                            <br/><br/>
                            <b> Address:</b> {item.eLoc}
                            <br/><br/>
                            <b>Date:</b> {item.eDate2}
                            <br/><br/>
                            <b>Time:</b> {item.eSTime} - {item.eETime}
                            
                        </CardText>
                        <CardActions border>
                            <Button raised colored ripple href={item.eLink}>Read more</Button>
                        </CardActions>
                    </Card>
                </div>
            )})}
                
            <div id='card'>
                <Card id='post' >
                    <CardTitle id='cardTitle' style={{background: 'url("https://socialwork.uw.edu/sites/default/files/sswfiles/brand/Convio/Convio_Email_Banner_UW.jpg") center / cover #46B6AC'}}>
                    Leadership Without Borders</CardTitle>
                    <CardText>
                        Leadership Without Borders (LWB) was created with Undocumented Students in mind and with the mission to serve as a launch pad for students’ leadership, a space for community building, and a connection point for awareness as well as to resources and services for undocumented students.
                        The program offers leadership development resources, meeting space, artwork, a textbook lending library, and an atmosphere designed to provide both aspiration and inspirational aspects for multi-ethnic, multi-identity, and multi-national communities.
                        We invite you to learn more about the history, services, and stories that embody Leadership Without Borders.
                        <br/><br/>
                            <b>Email:</b> undocu@uw.edu
                            <br/><br/>
                            <b> Address:</b> 3931 Brooklyn Avenue NE Box 355650 Seattle, Washington 98105
                            <br/><br/>
                            <b>Date:</b> Jun 02 2018
                            <br/><br/>
                            <b>Time:</b> frome 1:30 PM to 3:30 PM
                        
                
                    </CardText>
                    <CardActions border>
                        <Button raised colored ripple href="http://depts.washington.edu/ecc/lwb/">View Page</Button>
                    </CardActions>
                </Card>
            </div>
        
            <div id='card'>
                <Card id='post'>
                    <CardTitle id='cardTitle' style={{background: 'url(http://depts.washington.edu/ecc/lwb/wp-content/uploads/2018/02/022.png) center / cover'}}>
                    Spring Quarter 2018 Undocu Ally Training</CardTitle>
                    <CardText>
                        The Leadership Without Borders Center (LWB), founded on 2014 by staff at Kelly Ethnic Cultural Center, 
                        is dedicated to work with our campus and at large community to build a comprehensive pathway for undocumented 
                        students’ access and success at our university and beyond. As part of this work, LWB established the Undocu Ally 
                        Training & Education program to provide staff and faculty at the UW-Seattle campus with resources, information, and 
                        guidance on how to be an ally to undocumented students.
                        <br/><br/>
                        <b>Email:</b> undocu@uw.edu
                            <br/><br/>
                            <b> Address:</b> 3931 Brooklyn Avenue NE Box 355650 Seattle, Washington 98105
                            <br/><br/>
                            <b>Date:</b> Jun 04 2018
                            <br/><br/>
                            <b>Time:</b> frome 9:30 AM to 3:30 PM
                        
                    </CardText>
                    <CardActions border>
                        <Button raised colored ripple href="https://docs.google.com/forms/d/e/1FAIpQLSeskYQB_NUA_buV8RfxjNK-fioKIoppfP31GKd32K05wBzJmA/viewform?c=0&w=1">Event Link</Button>
                    </CardActions>
                </Card>
            </div>
            <div id='card'>
                <Card id='post'>
                    <CardTitle id='cardTitle' style={{ background: 'url(https://socialwork.uw.edu/sites/default/files/sswfiles/brand/Convio/Convio_Email_Banner_UW.jpg) center / cover'}}>
                    UW, TheDream.US announce new scholarship partnership to benefit undocumented students</CardTitle>
                    <CardText>
                    The University of Washington and TheDream.US announced a new partnership this week that will provide scholarships 
                    to qualified undocumented students who graduate from two-year colleges and transfer to UW Seattle.TheDream.US is the 
                    nation’s largest college access and success program for DREAMers – undocumented immigrants who came to this country 
                    as children. The organization currently has more than 3,000 scholars who are enrolled in or have graduated from over 
                    75 partner colleges in 15 states.
                        <br/><br/>
                        <b>Email:</b> undocu@uw.edu
                            <br/><br/>
                            <b> Address:</b> 3931 Brooklyn Avenue NE Box 355650 Seattle, Washington 98105
                            <br/><br/>
                            <b>Date:</b> Jun 05 2018
                            <br/><br/>
                            <b>Time:</b> frome 4:30 PM to 6:30 PM
                        
                    </CardText>
                    <CardActions border>
                        <Button raised colored ripple href="http://www.washington.edu/omad/2018/01/19/uw-thedream-us-announce-new-scholarship-partnership-to-benefit-undocumented-students/">Read More</Button>

                    </CardActions>
                </Card>
            </div>
            <div id='card'>
                <Card id='post'>
                    <CardTitle id='cardTitle' style={{ background: 'url(http://depts.washington.edu/ecc/lwb/wp-content/uploads/2016/07/lwb.png) center / cover'}}>
                    UW to Participate in National First-Generation College Celebration on November 8</CardTitle>
                    <CardText>
                    On November 8, the University of Washington joins the Council for Opportunity in Education, 
                    NASPA’s Center for First-Generation Student Success, the American Association of Colleges & 
                    Universities and higher education institutions across the country in recognizing the National 
                    First-Generation College Celebration.
                    <br/><br/>
                    This first-annual celebration falls on the 52nd anniversary of the signing of the Higher Education
                     Act (HEA) of 1965. Among the many resources and initiatives connected to the legacy of HEA is the 
                     recognition of the experience of those who are the first in their families to attend college.
                        <br/><br/>
                        <b>Email:</b> undocu@uw.edu
                            <br/><br/>
                            <b> Address:</b> 3931 Brooklyn Avenue NE Box 355650 Seattle, Washington 98105
                            <br/><br/>
                            <b>Date:</b> Jun 09 2018
                            <br/><br/>
                            <b>Time:</b> frome 7:30 PM to 12:30 PM
                    </CardText>
                    <CardActions border>
                        <Button raised colored ripple href="http://www.washington.edu/omad/2017/11/05/first-generation-college-celebration/">Read More</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
  }
}

export default Resources;