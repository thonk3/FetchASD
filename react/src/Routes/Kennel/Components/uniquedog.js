import React, { Component } from 'react';
import './kennel.css';


class UniqueDog extends Component {
    render() {
    return(
        <div>
            <p>This is Dog {this.props.dogs.Name} </p>
        </div>
    )
    }
}

// class UniqueDog extends Component {

//     render() {

//         return (

// <h3>{this.props.obj.Name}</h3>
//         );
//     }
// }


export default UniqueDog;