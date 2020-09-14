import React from 'react';

// import NameThing from './NameThing'
import LandingPage from './LandingPage';

const Home = (props) => {
    // const { loggedIn } = props;

    return (
        <>
            {props.loggedIn ? 
                <>
                    <h2> Hallo thar user something</h2>
                    {/* <NameThing />  */}
                </>
                : 
                <LandingPage />
            }
        </>
    );
};

export default Home;