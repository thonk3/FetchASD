import React, { Component } from 'react';
import axios from "axios";
 
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
         const{name, age, breed, suburb, gender, rating} = this.state
         return (
             <div>
            {name},{age}
             Breed: {breed}
             Suburb: {suburb}
             Gender: {gender}
             Rating: {rating}
             </div>

         )
     }
 } 