import React  from 'react';
import './index.css';
import { Card, Button, List, ListItem, ListItemContent, ListItemAction, Dialog, DialogContent, DialogTitle, DialogActions} from 'react-mdl';
import firebase from 'firebase';

class MyEvents extends React.Component {

        constructor(props){
            super(props);
            this.state = {postList:[]};
        }
        
        componentDidMount() {
            var usersRef = firebase.database().ref('users');
            usersRef.on('value', (snapshot) => {
                this.setState({users:snapshot.val()});
            });
            
            var currentUser = firebase.auth().currentUser.uid;
            // Add a listener for changes to the chirps object, and save in the state 
    
            var postRef = firebase.database().ref('channel/event');
            postRef.on('value', (snapshot) => {
                var postArray = []; //could also do this processing in render
                snapshot.forEach(function(child){
                    if (currentUser === child.val().userId) {
                        var message = child.val();
                        message.key = child.key; //save the unique id for later
                        postArray.push(message); //make into an array
                    }
                });
                
                postArray.sort((a,b) => b.time - a.time); //reverse order
                this.setState({postList:postArray});
            });
        }

    
        //When component will be removed
        componentWillUnmount() {
            //unregister listeners
            firebase.database().ref('users').off();
            firebase.database().ref('channel/event').off();
        }
    
        render() {
            var size = this.state.postList.length;
            //console.log(this.state.postCount);
            if(!this.state.users){
                return null;
            }
    
            // Create a list of <PostItem /> objects 
            var chan = event;
            var postItems;
            if (size === 0) {
                postItems = <ListItem>You have not posted any events</ListItem>
            } else {
                postItems = this.state.postList.map((message) => {
                    
                    return <PostItem message={message} user={this.state.users[message.userId]} key={message.key} chan={chan}/>
                })
            }
            return (
            <div id='card'>
                <div id='center'>
                    <h2>Your Posted Events</h2>
                    <Card id='post' >
                    
                    <List>{postItems}</List>
                  
                    </Card>
                </div>
            </div>);
        }
    }

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
                }*/
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
        // reuploads the new edited text
        /* editPost(e) {
            e.preventDefault();
            
            //var newPostKey = firebase.database().ref().child('posts');
            firebase.database().ref().child('channel/event' +"/"+this.props.message.key).update(
                {
                    eName:this.state.post
                
                }
            );
        
        }
        //changes the text in post 
        updatePost(e) {
            this.setState({post: e.target.value});
        }*/
    
        render() {
            return (
                <div>

                    
                    <ListItem threeLine>
                        
                        <ListItemContent avatar='person' subtitle={this.props.message.eDescr}>
                            {this.props.message.eName}
                            
                        </ListItemContent>
                        
                        
                        {/*<ListItemAction>
                            <Button onClick={this.handleOpenEdit}>edit</Button>  
                            <Dialog open={this.state.openEdit}>
                                <DialogTitle>Edit post</DialogTitle>
                                <DialogContent>
                                    <Textfield 
                                        onChange={this.updatePost}
                                        value = {this.props.message.eName} 
                                        label={this.props.message.eName}  
                                        style={{width: '400px'}} 
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button type='button'onClick={(e) => this.editPost(e)}>Update</Button>
                                    <Button type='button' onClick={this.handleCloseEdit}>Canel</Button>
                                </DialogActions>
                            </Dialog>         
                        </ListItemAction>*/}
    
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
    }

export default MyEvents;