import React from 'react';
import { Link} from 'react-router';
import { Navigation, Button, ListItem, ListItemContent} from 'react-mdl';
import firebase from 'firebase';
import {hashHistory } from 'react-router';
//top level Navbar for the app
class NavBar extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
    };
  }

  channelName(e) {
    this.setState({name: e.target.value});
  }
  
  componentDidMount() {
  
    var currentUser = firebase.auth().currentUser.uid;
    // Add a listener for changes to the chirps object, and save in the state 
    //this.setState({postCount:count});
    var postRef = firebase.database().ref('channel/event');
    postRef.on('value', (snapshot) => {
        var count = 0; //could also do this processing in render
        snapshot.forEach(function(child){
            if (currentUser === child.val().userId) {
              count++;
            }
        });
        this.setState({postCount:count});
    });

    var nameRef = firebase.database().ref('users/'+currentUser);
    var name = '';
    nameRef.on('value', (snapshot) => {
        name = snapshot.val().name;
        console.log(name);
        this.setState({userN:name});
    });
  }

  componentWillUnmount() {
    //unregister listeners
    firebase.database().ref('users').off();
    firebase.database().ref('channel/event').off();
  }

  logout() {
    firebase.auth().signOut().then(() => hashHistory.push('/login'))
    .catch((err) => console.log(err)); 
  }

  render() {
    var n = this.state.postCount + ' posts';
    var userName = this.state.userN;
    return (
      <div>
        
          <Navigation>
            <div>
            <ListItem twoLine>
              <ListItemContent avatar="person" subtitle={n}>{userName}</ListItemContent>
                
            </ListItem>
            </div>
            
            <Link to="/channel/event" activeClassName="active">ADD NEW EVENT</Link>
            {/*<Link to="/profile" activeClassName="active">ACCOUNT SETTINGS</Link>*/}
            <Link to="/myEvents" activeClassName="active">VIEW YOUR POSTS</Link>
            
            
            <div>
            <Button raised accent ripple onClick={()=>this.logout()}>Sign Out </Button>
            </div>
          </Navigation>     
          
      </div>
    );
  }
}
export default NavBar;