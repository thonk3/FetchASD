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
        axios.get(`/api/dogs/${id}`)
        .then(res => {
            console.log("return data")
            console.log(res.data);
            this.setState({
                name: res.data.Name,
                age: res.data.Age,
                breed: res.data.Breed,
                suburb: res.data.Suburb,
                gender: res.data.Gender,
                // rating: res.data.Rating,
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        const { name, age, breed, suburb, gender, rating } = this.state;
        console.log("state")
        console.log(this.state)
        return (
            <div className="contain-within">
                <div className="float-left">
                    <div className="imgplaceholder">image here</div>

                    <div className="button">
                        <Button variant="contained" color="primary"> Express Interest </Button>
                    </div>
                </div>

                <div>  
                    <h1>{name}, {age}</h1>
                    <h3> Breed: {breed} </h3>
                    <h3> Suburb: {suburb} </h3>
                    <h3> Gender: {gender} </h3>
                    <h3> Rating: {rating || "not yet rated"} </h3>
                    <br/> 
                    <h3> Bio:  </h3>
                </div>
            </div>
        )
    }
} 
