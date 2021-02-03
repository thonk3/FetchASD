import React from 'react';
import { useAuth } from '../../contexts/authContext';

import Container from '@material-ui/core/Container'
import LandingPage from '../landing/LandingPage';
import Kennel from '../kennel/KennelContainer';

import token from '../../utils/tokenUtils';

/* 
    Component for the main page at path /

    returns
        LandingPage - if logged in
        Kennel      - if not logged in
*/

const Home = (props) => {
    const { loggedIn } = useAuth();

    if (loggedIn) return (
        <>
            <Container>
                <h2> Welcome back {token.getName()}</h2>
            </Container>
            <Kennel />
        </>
    );
    else return <LandingPage />;
};

export default Home;