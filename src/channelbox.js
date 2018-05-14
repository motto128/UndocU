import React  from 'react';
import './index.css';
import { hashHistory } from 'react-router';
import { Card, Textfield, Button, List, ListItem, Dialog, DialogContent, DialogTitle, DialogActions} from 'react-mdl';
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
                eventLoc:'',
                //eventCity:'',
                eventLink:'',
                eventDescr:''
                
            
        };
        this.handleEName = this.handleEName.bind(this);
        this.handleETag = this.handleETag.bind(this);
    	this.handleEDate = this.handleEDate.bind(this);
        this.handleELoc = this.handleELoc.bind(this);
        //this.handleECity = this.handleELoc.bind(this);
    	this.handleELink = this.handleELink.bind(this);
        this.handleEDescr = this.handleEDescr.bind(this);
        
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
        this.setState({eventDate: e});
    }
    handleELoc(e) {
        this.setState({eventLoc: e.target.value});
    }
    //handleECity(e) {
      //  this.setState({eventLoc: e.target.value});
    //}
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
        var d = this.state.eventDate.toString();
        var postRef = firebase.database().ref('channel/'+channelName); //the channel in the JOITC
        var newPost = {
            eName: this.state.eventName,
            eDate: d,
            eTag: this.state.eventTag,
            eLoc: this.state.eventLoc,
            //eCity: this.state.eventCity,
            eLink: this.state.eventLink,
            eDescr: this.state.eventDescr,
            userId: firebase.auth().currentUser.uid, //to look up channel info
            time: firebase.database.ServerValue.TIMESTAMP //MAGIC
        };
        postRef.push(newPost).then(() => hashHistory.push('/myEvents'))
        .catch((err) => console.log(err)); //empty out post (controlled input); //upload
        
        this.setState({
            eventName:'',
            eventTag:'',
            eventDate: moment(),
            eventLoc:'',
            eventLink:'',
            eventDescr:''
            
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
                        <List id='center'>
                            <p>Choose date and time of event:</p>
                            <ListItem>
                            
                            <DatePicker 
                            inline selected={this.state.eventDate} 
                            onChange={(e) => this.handleEDate(e)}
                            showTimeSelect
                            
                            />
                            </ListItem>

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