import React  from 'react';
import './index.css';
import { Link, hashHistory } from 'react-router';
import { Textfield, Button, List, ListItem, ListItemContent, ListItemAction, Dialog, DialogContent, DialogTitle, DialogActions, Icon} from 'react-mdl';
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
            
            var name = this.props.channelName;
            var currentUser = firebase.auth().currentUser.uid;
            // Add a listener for changes to the chirps object, and save in the state 
    
            var postRef = firebase.database().ref('channel/event');
            postRef.on('value', (snapshot) => {
                var postArray = []; //could also do this processing in render
                snapshot.forEach(function(child){
                    if (currentUser == child.val().userId) {
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
            var currentUser = firebase.auth().currentUser;
            var channelName = this.props.params.channelId;

            if(!this.state.users){
                return null;
            }
    
            // Create a list of <PostItem /> objects 
            var chan = event;
            console.log(chan);
            var postItems = this.state.postList.map((message) => {
                
                return <PostItem message={message} user={this.state.users[message.userId]} key={message.key} chan={chan}/>
            })
            return (
            <div id='card'>
                <div id='center'>
                    <h1>Your Posted Events</h1>
                    <List style={{width: '700px'}}>{postItems}</List>
                </div>
            </div>);
        }
    }

    //A single post
    class PostItem extends React.Component {
        
        constructor(props) {
            super(props)
            this.state ={'edit': true};
    
            //this.showEdit = this.showEdit.bind(this);
            this.deleteNote = this.deleteNote.bind(this);
            this.handleOpenDialog = this.handleOpenDialog.bind(this);
            this.handleCloseDialog = this.handleCloseDialog.bind(this);
            this.handleOpenEdit = this.handleOpenEdit.bind(this);
            this.handleCloseEdit = this.handleCloseEdit.bind(this);
            this.editPost = this.editPost.bind(this);
            this.handleCloseEdit = this.handleCloseEdit.bind(this);
            //this.updatePost = this.updatePost.bind(this);
        }
        // if the user click only on their own post will enable buttons to edit
        /*showEdit() {
            
            var currentUser = firebase.auth().currentUser.uid; 
            console.log(currentUser);
            if (currentUser === this.props.message.userId) {
                this.setState({edit: false});
            }
            console.log(this.state.edit);
        }*/
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
         handleOpenEdit() {
            this.setState({
                openEdit: true
            });
        }
    
        handleCloseEdit() {
            this.setState({
                openEdit: false
            });
        }
        
        //deletes the specificly chosen post from the database log
        deleteNote(){
            firebase.database().ref('channel/event' +"/"+this.props.message.key).remove();
        }
        // reuploads the new edited text
         editPost(e) {
            e.preventDefault();
            var userRef = firebase.database().ref('channel/event' +"/"+this.props.message.key);
            userRef.child('eName').set(this.state.post);
            //this.setState({post: ''})
        }
        //changes the text in post 
        updatePost(e) {
            this.setState({post: e.target.value});
        }
    
        render() {
            return (
                <div>
                    <ListItem threeLine>
                        
                        <ListItemContent avatar={this.props.message.avatar} subtitle={this.props.message.eDescr}>
                            {this.props.message.eName}
                        </ListItemContent>
                        
                        <ListItemAction>
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
                        </ListItemAction>
    
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