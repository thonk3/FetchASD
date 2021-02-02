import React from 'react';
import LandingHero from './hero/Hero';
import Categories from './categories/Categories'
import LandingHowItWorks from './howItWorks/LandingHowItWorks';
import LandingHelp from './help/LandingHelp';

/* 
    LandingPage component for not logged in user
*/

const LandingPage = () => {
    return (
        <>
            <LandingHero />
            <Categories/>
            <LandingHowItWorks />
            <LandingHelp />
        </>
    );
};

export default LandingPage;