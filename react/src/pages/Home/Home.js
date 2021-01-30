import React from 'react';

// import NameThing from './NameThing'
import LandingPage from './LandingPage';
import Kennel from '../Kennel/Kennel';
import { useAuth } from '../../contexts/authContext'; 
import Container from '@material-ui/core/Container'

import token from '../../utils/token';

const Home = (props) => {
    const { loggedIn } = useAuth();

    return (
        <>
            {loggedIn ? 
                <>
                    <Container>
                    <h2> Welcome back { token().name }</h2>
                    </Container>
                    <Kennel />
                </>
                : 
                <LandingPage />
            }
        </>
    );
};

export default Home;