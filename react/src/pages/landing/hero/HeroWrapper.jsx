import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import useStyles from './Hero.style'
import Container from '@material-ui/core/Container';

/* 
    Wrapper for Hero Component
*/


const HeroWrapper = props => {
    const { backgroundClassName, children } = props;
    const classes = useStyles();

    return (
        <section className={classes.wRoot}>
            <Container className={classes.wContainer}>
                {children}

                <div className={classes.wBackdrop} />
                <div className={clsx(classes.wBackground, backgroundClassName)} />
            </Container>
        </section>
    );
}

HeroWrapper.propTypes = {
    backgroundClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default HeroWrapper;
