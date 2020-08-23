import React from 'react';
import ButtonAppBar from './Components/navbar';
import SimpleSelect from './Components/filters';

// kennel page

class Kennel extends React.Component {
    render() {
        return (
            <div><ButtonAppBar />
            <SimpleSelect /></div>
        )
    }
}

export default Kennel