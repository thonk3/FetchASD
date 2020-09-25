import React, { Component } from 'react';
import axios from "axios";
import './Components/kennel.css';
import Button from '@material-ui/core/Button';


export default class Dog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            age: '',
            breed: '',
            suburb: '',
            gender: '',
            rating: '',
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        axios.get(`/api/canines/${id}`)
            .then(res => {
                this.setState({
                    name: res.data.Name,
                    age: res.data.Age,
                    breed: res.data.Breed,
                    suburb: res.data.Suburb,
                    gender: res.data.Gender,
                    rating: res.data.Rating,

                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const { name, age, breed, suburb, gender, rating } = this.state
        return (

            <div class="contain-within">
                <div class="float-left">
                    <div class="imgplaceholder">image here
                 </div>
                    <div class="button">
                        <Button variant="contained" color="primary">
                            Express Interest
                        </Button>
                    </div>
                </div>
                <div>
                    <h1>{name}, {age}</h1>
                    <h3>Breed: {breed}
                        <br />
             Suburb: {suburb}
                        <br />
             Gender: {gender}
                        <br />
             Rating: {rating}
                        <br />
                        <h4>Bio:</h4> </h3>

                </div>
            </div>

        )
    }
} 