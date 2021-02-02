import React from 'react';
import LandingHero from './Hero/Hero';
import LandingCategories from './Categories/LandingCategories'
import LandingHowItWorks from './HowItWorks/LandingHowItWorks';
import LandingHelp from './Help/LandingHelp';

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