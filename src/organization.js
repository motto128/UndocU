import React from 'react';
import { Card, CardActions, CardText, CardTitle, Button} from 'react-mdl';
import data from './data/events.json';


class Organization extends React.Component {
  
    render() {

    return (
        <div>
            <h2>Organizations</h2>
           
            {
            data.map(row => (
                <div id='card'>
                <Card id='post'>
                <CardTitle id='cardTitle' style={{ background:  row.img +'center / cover #46B6AC'}}>{row.Name}</CardTitle>
                <CardText>
                        {row.Descr}
                        <br/><br/>
                        <b>Phone Number:</b>{row.Contact.Phone_Number}
                        <br/><br/>
                        <b>Email:</b> {row.Contact.Email}
                        <br/><br/>
                        <b>Street Address:</b> {row.Address.Street_Address}
                    </CardText>
                    <CardActions border>
                        <Button colored href={row.Link}>Read More</Button>
                    </CardActions>
                </Card>
                </div>
            ))         
            } 
            
            
        </div>
    )
  }
}

export default Organization;