// pls ignore
import React from 'react';

class ListName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, // this is to render the loading spinner
            people: []
        };
    }

    // fetch json
    componentDidMount() {
    fetch("/api/people")
        .then(res => res.json())
        .then(res => {
            this.setState({
                isLoaded: true, 
                people: [...res] 
            }); 
        })
    };

    componentWillReceiveProps(next) {
        console.log(next);
        if (next.people !== this.state.people) {
            this.setState({
                people: [...next.people]
            })
        }
    }

    // map data to a jsx element
    // yes its ugly
    renderName = () => 
        this.state.people.map( p => {
            return (
                <li key={p._id}>{p.name} </li>
            )
        }
    );

    render() {
        return ( <ul> { this.renderName() } </ul> )
    }
};

export default ListName;