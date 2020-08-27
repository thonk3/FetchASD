import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './kennel.css';
import Button from '@material-ui/core/Button';


class DataTable extends Component {
    render() {
        return (
            <Card class="dog">
                <CardContent>
                    <h3>{this.props.obj.dogName}</h3>
                    <p>{this.props.obj.dogBreed}, {this.props.obj.dogLocation}</p>
                    <Button variant="contained" color="primary"> View Profile </Button>
                </CardContent> 
            </Card>
        );
    }
}

export default DataTable;