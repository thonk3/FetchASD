// pls ignore
import React, { useState, useEffect } from 'react';

import ListName from './ListName'
import { CircularProgress, TextField, Button, FormControl } from '@material-ui/core';

// class NameThing extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             name: '',
//             people: [],
//             isLoading: false
//         };

//         // binding this
//         this.handleNameChange = this.handleNameChange.bind(this);
//         this.handleNameSubmit = this.handleNameSubmit.bind(this);
//     }

//     componentDidMount() {
//     fetch("/api/people")
//         .then(res => res.json())
//         .then(res => {
//             this.setState({
//                 isLoading: true, 
//                 people: [...res] 
//             }); 
//         })
//     };

//     componentWillMount() {
//         fetch('/api/people')
//             .then(res => res.json())
//             .then(res => {
//                 this.setState({
//                     name: '',
//                     isLoading: true,
//                     people: [...res]
//                 });
//             });

//         console.log("hey")
//     }

//     // when text change
//     handleNameChange(e) {
//         this.setState({ ...this.state, name: e.target.value });
//     }

//     // on submit
//     handleNameSubmit(e) {
//         e.preventDefault();

//         // POST add thingy
//         fetch('/api/people/add', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username: this.state.name
//             })
//         }).then(res => {
//             console.log("loading");
//             this.setState({ ...this.state, isLoading:false })
//         });

//         // GET list again
//         fetch('/api/people')
//             .then(res => res.json())
//             .then(res => {
//                 this.setState({
//                     isLoading: true,
//                     people: [...res]
//                 });
//             })

//         console.log(this.state.name);
//     }



//     render() {
//         // const { people, isLoading } = this.state;
//         return (
//             <>
//                 <form onSubmit={this.handleNameSubmit}>
//                     <TextField variant='outlined' label='something' type='text' value={this.state.name} onChange={this.handleNameChange}/>
//                     <Button type='submit' variant='contained'> Somthing </Button>
//                 </form>

//                 {this.state.isLoading ?
//                 <ListName people={this.state.people} isLoading={this.state.isLoading} />
//                 :
//                 <CircularProgress /> }
//             </>
//         )
//     }
// };



const NameThing = props => {
    // state hooks
    const [state, setState] = useState({
        isLoaded: false,
        people: []
    })

    // lifecycle
    useEffect(() => {
        setTimeout(() => {
            setState({
                ...state,
                isLoaded: true
            });
        }, 1000);

        // return () => {
            
        // }
    }, [])

    // handlers
    const handleTextChange = (e) => {
        setState({
        ...state,
        name: e.target.value
    });

    console.log(state.name);
    };

    // jsx
    return (
        <>
            <p>Oh boy</p>
            <form>
                <FormControl>
                    <TextField 
                        variant='outlined' 
                        label='something'/>
                </FormControl>

                <Button type='submit' variant='contained'> Somthing </Button>
            </form>

            { state.isLoaded ?
            <ListName people={state.people} />
            :
            <CircularProgress />
            }
        </>
    );
}

export default NameThing;