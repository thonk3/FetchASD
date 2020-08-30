import React from 'react';

import LandingHero from './LandingComponents/Hero/LandingHero';
import LandingHelp from './LandingComponents/Help/LandingHelp';


// I DONT KNOW WHAT ANY OF THIS DOES
// HOW DO I REFACTOR THIS
const LandingPage = () => {
    return (
        <>
            <LandingHero />
            <p>LandingValues</p>
            <p>LandingHowItWorks</p>
            <p>LaningCategories</p>
            <LandingHelp />

        </>
    );
};

export default LandingPage;