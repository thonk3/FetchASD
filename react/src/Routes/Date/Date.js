import React from 'react';
import axios from 'axios';
import DateItem from './Components/date-item';

class Dates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/date/sent/5f5850017fb19a1420425abb')
            .then(res => {
                this.setState({
                    dates: res.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dateItem() {
        return this.state.dates.map((data, i) => {
            return <DateItem obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h2>My Dates</h2>
                {this.dateItem()}
            </div>
        )
    }
}

export default Dates;