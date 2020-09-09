import React, { Component } from 'react';
import UniqueDog from './Components/uniquedog';
import axios from "axios";

/* 

export default class Dog extends Component{

    constructor(props) {
        super(props)
        this.state = {
            dog: []
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id);
        axios.get('/api/canines/${id}')
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

    uniqueDog = () => {
        return this.state.dogs.map((data, i) => {
            return <UniqueDog dogs={data} key={i} />;
        });
    }
    render() {
        return (
            <div>
                     {this.state.isLoaded ?
                        this.uniqueDog()
                        :
                        <>
                            <br />
                    
                        </>
                    }  
            </div>
        )
    }
}
 */

 export default class Dog extends Component {
     constructor(props) {
         super(props)

         this.state = {
             id: this.props.match.params._id,
             name: '',
         }
     }

     componentDidMount = async () => {
         const { id } = this.state
         axios.get(`/api/canines/${id}`)
         .then(res => {
             this.setState({
                name: res.data.name,
             });
         })
         .catch((error) => {
            console.log(error);
        })
     }

     render() {
         const{name} = this.state
         return (
             <h1>{name}</h1>
         )
     }
 }