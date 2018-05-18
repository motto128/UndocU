import React  from 'react';
import './index.css';
import { Icon, Card, CardTitle, CardText, CardActions, CardMenu, IconButton, Button, List, ListItem, ListItemContent, ListItemAction, Dialog, DialogContent, DialogTitle, DialogActions} from 'react-mdl';
import firebase from 'firebase';

class Profile extends React.Component {

        constructor(props){
            super(props);
            this.state = {postList:[]};
        }
        
        componentDidMount() {
            
        
        }

    
        //When component will be removed
        componentWillUnmount() {
            //unregister listeners
            
        }
    
        render() {
            
            return (
            <div>
                
                    <h2>Account Settings</h2>
                    
                    <Card id='post' >
                    
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Welcome</CardTitle>
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris sagittis pellentesque lacus eleifend lacinia...
                    </CardText>
                    <CardActions border>
                        <Button colored>Get Started</Button>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                  
                    </Card>
                    <div id='card'>
                    
                    <List id='listBox'>
                        <ListItem id='list'>
                            <ListItemContent>Name</ListItemContent>
                            <ListItemAction>
                            <a href="#"><Icon name="star" /></a>
                            </ListItemAction>
                        </ListItem>
                        <ListItem id='list'>
                            <ListItemContent>Email</ListItemContent>
                            <ListItemAction>
                            <a href="#"><Icon name="star" /></a>
                            </ListItemAction>
                        </ListItem>
                        <ListItem id='list'>
                            <ListItemContent>Phone Number</ListItemContent>
                            <ListItemAction>
                            <a href="#"><Icon name="star" /></a>
                            </ListItemAction>
                        </ListItem>
                        <ListItem id='list'>
                            <ListItemContent>Phone Number</ListItemContent>
                            <ListItemAction>
                            <a href="#"><Icon name="star" /></a>
                            </ListItemAction>
                        </ListItem>
                    </List>
                    </div>

                    
                    
            </div>);
        }
    }
/*
    //A single post
    class PostItem extends React.Component {
        
        constructor(props) {
            super(props)
            this.state ={
                'edit': true,
                /*{
                    eventName:'',
                    eventDate: '',
                    eventLoc:'',
                    //eventCity:'',
                    eventLink:'',
                    eventDescr:''
                }
            };
    
            this.deleteNote = this.deleteNote.bind(this);
            this.handleOpenDialog = this.handleOpenDialog.bind(this);
            this.handleCloseDialog = this.handleCloseDialog.bind(this);
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
 
        
        //deletes the specificly chosen post from the database log
        deleteNote(){
            firebase.database().ref('channel/event' +"/"+this.props.message.key).remove();
        }
    
        render() {
            return (
                <div>

                    
                    <ListItem threeLine>
                        
                        <ListItemContent avatar='person' subtitle={this.props.message.eDescr}>
                            {this.props.message.eName}
                            
                        </ListItemContent>
    
                        <ListItemAction>
                            <Button onClick={this.handleOpenDialog}>delete</Button>
                            <Dialog open={this.state.openDialog}>
                                <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                                <DialogContent>
                                    <p>Confirming will detete this post perminatly.</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button type='button'onClick={this.deleteNote}>Agree</Button>
                                    <Button type='button' onClick={this.handleCloseDialog}>Disagree</Button>
                                </DialogActions>
                            </Dialog>
                        </ListItemAction>
                        
                    </ListItem>
                    
                </div>
            );
        }
    }*/

export default Profile;