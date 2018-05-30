import React  from 'react';
import './index.css';
import { hashHistory } from 'react-router';
import { Card, Textfield, Grid, Cell, Button, List, ListItem, Dialog, DialogContent, DialogTitle, DialogActions} from 'react-mdl';
import firebase from 'firebase';
import { SelectField, Option } from 'react-mdl-extra';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class ChannelBox extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
                eventName:'',
                eventTag:'',
                eventDate: moment(),
                eventDate2: '',
                eventSTime:'',
                eventETime:'',
                eventLoc:'',
                eventLink:'',
                eventDescr:'',
                eventEmail:''
                
            
        };
        this.handleEName = this.handleEName.bind(this);
        this.handleETag = this.handleETag.bind(this);
        this.handleEDate = this.handleEDate.bind(this);
        this.handleESTime = this.handleESTime.bind(this);
        this.handleEETime = this.handleEETime.bind(this);
        this.handleELoc = this.handleELoc.bind(this);
        //this.handleECity = this.handleELoc.bind(this);
    	this.handleELink = this.handleELink.bind(this);
        this.handleEDescr = this.handleEDescr.bind(this);
        this.handleEEmail = this.handleEEmail.bind(this);
        
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
    //when the text in the form changes
    handleEName(e) {
        this.setState({eventName: e.target.value});
    }
    handleETag(e) {
        this.setState({eventTag: e});
    }
    handleEDate(e) {
        //var dDformat = e.format('LL'); 
        //var dDformat2 = e.format('L'); 
        this.setState({eventDate: e});
        //this.setState({eventDate2: dDformat2});
        //console.log(dDformat);
    }
    handleESTime(e) {
        //var dSformat = e.format('LT'); 
        this.setState({eventSTime: e});
        
    }
    handleEETime(e) {
        //var dEformat = e.format('LT'); 
        this.setState({eventETime: e});
    }
    handleELoc(e) {
        this.setState({eventLoc: e.target.value});
    }
    handleEEmail(e) {
        this.setState({eventEmail: e.target.value});
    }
    handleELink(e) {
        this.setState({eventLink: e.target.value});
    }
    handleEDescr(e) {
        this.setState({eventDescr: e.target.value});
    }
    
    handleOpenDialog() {
        this.setState({
          openDialog: true
        });
      }
    
      handleCloseDialog() {
        this.setState({
          openDialog: false
        });
      }
    //post a new message to the database
    submitPost(e) {
        e.preventDefault(); //don't submit
        /* Add a new Channel to the database */
        var channelName = this.props.params.channelId;
        console.log(this.props.params.channelId);
        var d = this.state.eventDate.format('L').toString();
        var d2 = this.state.eventDate.format('LL').toString();
        var start = this.state.eventSTime.format('LT').toString();
        var end = this.state.eventETime.format('LT').toString();
        var postRef = firebase.database().ref('channel/'+channelName); //the channel in the JOITC
        var newPost = {
            eName: this.state.eventName,
            //eDate: this.state.eventDate,
            //eDate2: this.state.eventDate2,
            eDate: d,
            eDate2: d2,
            //eSTime: this.state.eventSTime,
            eSTime: start,
            //eETime: this.state.eventETime,
            eETime: end,
            eTag: this.state.eventTag,
            eLoc: this.state.eventLoc,
            eLink: this.state.eventLink,
            eDescr: this.state.eventDescr,
            eEmail: this.state.eventEmail,
            userId: firebase.auth().currentUser.uid, //to look up channel info
            time: firebase.database.ServerValue.TIMESTAMP //MAGIC
        };
        postRef.push(newPost).then(() => hashHistory.push('/myEvents'))
        .catch((err) => console.log(err)); //empty out post (controlled input); //upload
        
        this.setState({
            eventName:'',
            eventTag:'',
            eventDate: moment(),
            eventDate2: '',
            eventSTime: '',
            eventETime: '',
            eventLoc:'',
            eventLink:'',
            eventDescr:'',
            eventEmail:''
            
         })
    }

    render() { 

        //var chanName = <ChannelList channelName={channelName} />
        //console.log(channelName);
  
        return(
            <div id='card'>
                <div id='center'>
                    <h2>Your Posted Events</h2>
                    
                    <div id='card'>
                    <Card id='post'>
                    <div id='card'>
                        
                            <p id='dateText'>Choose date and time of event:</p>
                           
                            <Grid id='grid'>
                            <Cell id='cellD'>
                            
                            <DatePicker 
                            inline selected={this.state.eventDate} 
                            onChange={(e) => this.handleEDate(e)}
                            //dateFormat="YYYY/MM/DD"               
                            />
                            
                            </Cell>
                            <Cell id='cellST'>
                            <div id='center'>
                            <DatePicker
                               inline selected={this.state.eventSTime}
                                onChange={(e) => this.handleESTime(e)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Start"
                                dateFormat="LT"
                            />
                            </div>
                            </Cell>
                            <Cell id='cellET'>
                            <div id='center'>
                            <DatePicker
                                inline selected={this.state.eventETime}
                                onChange={(e) => this.handleEETime(e)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="End"
                                dateFormat="LT"
                            />
                            </div>
                            </Cell>
                            </Grid>
                            
                            <List id='center'>
                            <ListItem>
                            <SelectField label={'Choose catigory'} value={this.state.eventTag} onChange={(e) => this.handleETag(e)}>
                                <Option value={1}>Educational</Option>
                                <Option value={2}>Legal</Option>
                                <Option value={3}>Social</Option>
                                <Option value={4}>Other</Option>
                            </SelectField>
                            </ListItem>
                           
                            <ListItem>

                            <Textfield 
                            onChange={(e) => this.handleEName(e)}
                            value={this.state.eventName} 
                            label="Name of Event"
                            floatingLabel 
                            style={{width: '400px'}} 
                            />
                            </ListItem>
                        
                        
                            <ListItem>
                            <Textfield
                                onChange={(e) => this.handleELoc(e)}
                                value={this.state.eventLoc}
                                label="Address of Event"
                                floatingLabel
                                style={{width: '400px'}}
                            />
                            </ListItem>

                            <ListItem>
                            <Textfield
                                onChange={(e) => this.handleEEmail(e)}
                                value={this.state.eventEmail}
                                label="Contact Email"
                                floatingLabel
                                style={{width: '400px'}}
                            />
                            </ListItem>

                        

                            <ListItem>
                            <Textfield
                                onChange={(e) => this.handleELink(e)}
                                value={this.state.eventLink}
                                label="Link of Event"
                                floatingLabel
                                style={{width: '400px'}}
                            />
                            </ListItem>

                            <ListItem>
                            <Textfield
                                onChange={(e) => this.handleEDescr(e)}
                                value={this.state.eventDescr}
                                label="Description of Event"
                                floatingLabel
                                rows={3}
                                style={{width: '400px'}}
                            />
                            </ListItem>

                            <ListItem>
                            <Button raised colored onClick={this.handleOpenDialog}>Post</Button>
                            <Dialog open={this.state.openDialog}>
                                <DialogTitle>Check if all event details are correct?</DialogTitle>
                                    <DialogContent>
                                        <p>Event Name: {this.state.eventName}</p>
                                        <p>Time: {this.state.eventDate.toString()}</p>
                                        <p>Address: {this.state.eventLoc}</p>
                                        <p>Description: {this.state.eventDescr}</p>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button type='button'onClick={(e) => this.submitPost(e)}>Post</Button>
                                        <Button type='button' onClick={this.handleCloseDialog}>Canel</Button>
                                    </DialogActions>
                            </Dialog>
                            </ListItem>
                        </List>
                        </div>
                        </Card>
                        
                    
                    </div>
                    
                </div>
            </div>
            
        );
    }
}

export default ChannelBox;