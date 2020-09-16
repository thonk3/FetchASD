import React from 'react';

// import NameThing from './NameThing'
import LandingPage from './LandingPage';
import Kennel from '../Kennel/Kennel';

import token from '../../Helpers/token';

const Home = (props) => {
    // const { loggedIn } = props;

    return (
        <>
            {props.loggedIn ? 
                <>
                    <h2> Hallo thar user { token().email }</h2>
                    <Kennel />
                </>
                : 
                <LandingPage />
            }
        </>
    );
};

export default Home;