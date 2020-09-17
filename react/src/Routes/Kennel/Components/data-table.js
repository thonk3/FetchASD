import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './kennel.css';
import Button from '@material-ui/core/Button';


class DataTable extends Component {
    render() {
        const { obj } = this.props;

        return (
            <Card className="dog">
                <CardContent>
                    <h3>{obj.Name}</h3>
                    <p>{obj.Breed}, {obj.Location}</p>
                    <Button variant="contained" color="primary"> View Profile </Button>
                </CardContent> 
            </Card>
        );
    }
}

export default DataTable;