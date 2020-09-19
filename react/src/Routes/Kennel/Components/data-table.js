import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './kennel.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Dog from '../Dog'

class DataTable extends Component {

    render() {

        return (
            <div class="center-this">
            <Card class="dog">
                <CardContent>
                <div class="imgplaceholder">image here
                 </div>
                    <h2>{this.props.obj.Name}</h2>
                    <p>{this.props.obj.Breed}, {this.props.obj.Suburb}</p>
                    <Link to={this.props.obj._id} Component={Dog}>
                    <Button variant="contained" color="primary" > View Profile </Button>
                    </Link>
                </CardContent> 
            </Card>
            </div>
        );
    }
}


export default DataTable;