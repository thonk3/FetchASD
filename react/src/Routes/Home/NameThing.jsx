import React from 'react';

import ListName from './ListName'

class NameThing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            people: [],
            isLoading: false
        };

        // binding this
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
    }

    // when text change
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    // on submit
    handleNameSubmit(e) {
        e.preventDefault();

        // POST add thingy
        fetch('/api/people/add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.name
            })
        });

        // GET list again
        fetch('/api/people')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isLoaded: true,
                    people: [...res]
                });
            })

        console.log(this.state.name);
    }



    render() {
        const { people, isLoading } = this.state;
        return (
            <>
                <form onSubmit={this.handleNameSubmit}>
                    <input type='text' value={this.state.name} onChange={this.handleNameChange}/>
                    <input type='submit' value='add'/>
                </form>

                <ListName people={people} isLoading={isLoading} />
            </>
        )
    }
};

export default NameThing;