import React from 'react';
import LandingHero from './LandingComponents/Hero/LandingHero';
import LandingCategories from './LandingComponents/Categories/LandingCategories'
import LandingHowItWorks from './LandingComponents/HowItWorks/LandingHowItWorks';
import LandingHelp from './LandingComponents/Help/LandingHelp';

/* 
    LandingPage component for not logged in user
*/

const LandingPage = () => {
    return (
        <>
            <LandingHero />
            <LandingCategories/>
            <LandingHowItWorks />
            <LandingHelp />
        </>
    );
};

export default LandingPage;