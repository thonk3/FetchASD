import React from 'react';

// import NameThing from './NameThing'

const Home = (props) => {
    // const { loggedIn } = props;

    console.log(props.loggedIn)
    return (
        <>
            <h1>Main Page</h1>


            {props.loggedIn ? 
                <>
                    <h2> Hallo thar user something</h2>
                    {/* <NameThing />  */}
                </>
                : 
                <>
                    <h2> Who are you</h2>
                    {/* <NameThing />  */}
                </>}


        </>
    );
};

export default Home;