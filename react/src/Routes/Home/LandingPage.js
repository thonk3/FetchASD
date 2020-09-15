import React from 'react';

import LandingHero from './LandingComponents/Hero/LandingHero';
import LandingValues from './LandingComponents/Values/LandingValues'
import LandingCategories from './LandingComponents/Categories/LandingCategories';
import LandingHowItWorks from './LandingComponents/HowItWorks/LandingHowItWorks';
import LandingHelp from './LandingComponents/Help/LandingHelp';


// I DONT KNOW WHAT ANY OF THIS DOES
// HOW DO I REFACTOR THIS
const LandingPage = () => {
    return (
        <>
            <LandingHero />
            <LandingValues />
            <LandingCategories />
            <LandingHowItWorks />
            <LandingHelp />
        </>
    );
};

export default LandingPage;