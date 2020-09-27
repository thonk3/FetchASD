import React from 'react';

// import NameThing from './NameThing'
import LandingPage from './LandingPage';
import Kennel from '../Kennel/Kennel';
import { useAuth } from '../../Context/authContext'; 

import token from '../../Helpers/token';

const Home = (props) => {
    const { loggedIn } = useAuth();

    return (
        <>
            {loggedIn ? 
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