import React from 'react';
import LandingHero from './hero/Hero';
import Categories from './categories/Categories'
import HowTo from './howTo/HowTo';
import Help from './help/LandingHelp';

/* 
    LandingPage component for not logged in user
*/

const LandingPage = () => {
    return (
        <>
            <LandingHero />
            <Categories/>
            <HowTo />
            <Help />
        </>
    );
};

export default LandingPage;