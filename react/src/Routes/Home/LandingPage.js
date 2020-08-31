import React from 'react';

import LandingHero from './LandingComponents/Hero/LandingHero';
import LandingValues from './LandingComponents/Values/LandingValues'
import LandingHelp from './LandingComponents/Help/LandingHelp';


// I DONT KNOW WHAT ANY OF THIS DOES
// HOW DO I REFACTOR THIS
const LandingPage = () => {
    return (
        <>
            <LandingHero />
            <LandingValues />
            <p>LaningCategories</p>
            <p>LandingHowItWorks</p>
            <LandingHelp />

        </>
    );
};

export default LandingPage;