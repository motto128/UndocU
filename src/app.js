import React from 'react';
import './index.css';
import { hashHistory } from 'react-router';
import { Layout, Drawer, Header, Navigation, Content } from 'react-mdl';
import {SelectField, Option} from 'react-mdl-extra';
import Navbar from './navbar';
import firebase from 'firebase';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId: null
    };
  }
  componentWillMount() {
    this.authListener = this.authListener.bind(this);
    this.authListener();
  }
  authListener() {
    //Add a listener and callback for authentication events 
    this.fireBaseListener = firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log('Auth state changed: logged in as', user.email);
        this.setState({userId:user.uid});
        hashHistory.push('/channels');
      }
      else{
        console.log('Auth state changed: logged out');
        this.setState({userId: null});
        hashHistory.push('/login'); //null out the saved state
      }
    })
  }

  componentWillUnmount() {
    this.fireBaseListener && this.fireBaseListener();
    this.authListener = null;
 }


  render() {
    return (
      <div>
      {this.state.userId ?
      <div>
        <Layout fixedHeader fixedDrawer id='background'>
          <Header id='head' title="UndocUHelp">
              
              <Navigation>
                      <a href="#/home">HOME</a>
                      <a href="#/resources">EVENTS</a>
                      <a href="#/organization">ORGANIZATIONS</a>
                      <a href="#/about">ABOUT US</a>

              </Navigation>
              
          </Header>
          
         
          <Drawer title="Admin Settings">
            <Navbar/>
          </Drawer>
          
         
         <Content>{this.props.children}</Content>
         
        
        </Layout>

      </div>
      : 
      <div>
      <Layout fixedHeader id='background'>
        <Header title="UndocUHelp">
            
            <Navigation>
                    <a href="#/home">HOME</a>
                    <a href="#/resources">EVENTS</a>
                    <a href="#/organization">ORGANIZATIONS</a>
                    <a href="#/about">ABOUT US</a>
                    <a href="#/login">REGISTER / LOGIN</a>
                    

            </Navigation>
            
        </Header>
        
       {this.props.children}
       
      
      </Layout>

    </div>}
    </div>
       
    )
  }
}

export default App;