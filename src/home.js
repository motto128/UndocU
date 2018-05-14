import React from 'react';
import {Button, Card, CardActions, CardTitle, CardText} from 'react-mdl';


class Home extends React.Component {
  render() {
    return (
        <div>
            
            
            <div id='card' >
                <Card id='homeCard'>
                    <CardTitle id='homeTitle'> Welcome to UndocUHelp! </CardTitle>
                    <CardText>
                    <h3>The safe place for undocumented students to receive help and succeed </h3>
                    {/* UndocUHelp is a platform that brings together local organizations that provide advice and guidance to 
                    Undocumented Students. We strive to make sure that no one is left behind by building connections that 
                    make undocumented students feel right at home. */}
                    Getting through college is hard enough – but for undocumented students, the journey is even tougher. UndocUHelp provides undocumented students anonymous access to the resources they need, making it easy to discover organizations, safe spaces, and events where they can connect to community and receive specialized support. Designed as a platform for use by multiple organizations, UndocUHelp collects all the hard-to-find information about getting into college and succeeding as an undocumented student and makes it searchable in a single place.
                    </CardText>
                    <CardActions border>
                        <a href="#/about"><Button raised colored ripple>Learn More</Button></a>
                    </CardActions>
                    
                </Card>
            </div>
            
              <div id='card' >
                  <Card id='homeCard'>
                  
                      <CardTitle> Problem </CardTitle>
                      <CardText>
                      There is only about <strong> 5-10% </strong> of the undocumented immigrant population enrolling in higher education each year. From that small percentage, just <strong> 1-3% </strong> graduate. 
                      These miniscule percentages seem alarming, specially for undocumented students, who face tougher challenges 
                      in today's society. 
                      <p> </p>
                      <strong>
                      How can we help increase both the amount of undocumented immigrants that enter college and graduate successfully?
                      </strong>
                      </CardText>
                      
                  </Card>
                </div>
              
              
              <div id='card'>
                  <Card id='homeCard' >
                  
                      <CardTitle> Users & Needs </CardTitle>
                      <CardText>
                      Undocumented students face many struggles that affect their hopes of becoming 
                      college students and succeeding in college. Throughout that pursue of higher 
                      education, undocumented students have many <strong> needs </strong> that include: 
                      <h6> Guidance </h6>
                      <l>
                        <li> Legal advice </li>
                        <li> Academic advising & tutoring </li>
                        <li> Scholarships & tuition </li>
                        <li> Career opportunities </li>

                      </l>

                      <h6> Community </h6>
                      <l>
                        <li> Building connections with reliable organizations </li>
                        <li> Meeting new friends </li>
                        <li> Safe spaces </li>
                      </l>
                      </CardText>
                  </Card>
                </div>
              
              <div id='card'>
                  <Card id='homeCard'>
                      <CardTitle> Solution </CardTitle>
                      <CardText>
                      Addressing the information needs of undocumented students by connecting 
                      them to a platform that encapsulates local organizations that do provide 
                      professional guidance and safe spaces.             
                       
                      <h6> All in one place </h6>
                      <l>
                        <li> Discover organization-generated events </li>
                        <li> Browse organizations in your area </li>
                        <li> Find the right organizations for you </li>

                      </l>

                      <h6> Safe and anonymous </h6>
                      <p>
                      UndocUHelp doesn't demand any user information, it just lets you 
                      filter by location, date, or tags
                      </p>

                      <h6> For organizations </h6>
                      <p>
                      Organizations can sign up, where they can provide contact information and post events
                      </p>

                       </CardText>
                  </Card>
                </div>

         
          
            
        </div>
    )
  }
}



export default Home;