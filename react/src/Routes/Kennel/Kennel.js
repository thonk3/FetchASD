import React, { Component } from 'react';
import axios from "axios";
import DataTable from './Components/data-table';
import './Components/kennel.css';
import { Container, CircularProgress } from '@material-ui/core/';
import LayoutTextFields from './Components/filters';


export default class Kennel extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            dogs: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('/api/canines')
            .then(res => {
                this.setState({
                    dogs: res.data, 
                    isLoaded: true 
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    dataTable = () => {
        return this.state.dogs.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <Container fixed>
                <br></br>
                <LayoutTextFields/>

                <div class="flex-container">
                    {this.state.isLoaded ?
                        this.dataTable()
                        :
                        <>
                            <br />
                            <CircularProgress color="secondary"/>
                        </>
                    }
                </div>
            </Container>
        )
    }
}
