import React from 'react'
import doggo from '../../assets/doggo.gif'
import { makeStyles } from '@material-ui/core';

/* 
    component of a spinner gif

    size is adjustable providing the props
    width: to set the size of the spinner
*/
const useStyle = makeStyles(theme => ({
    spinner: {
        display: 'block',
        margin: 'auto',
    }
}))

const Spinner = props => {
    const classes = useStyle();
    const { width } = props;

    return <img 
        src={doggo} 
        className={classes.spinner}
        width={width}
        alt='a spinning dog, reaching for his tail - a loading icon.'
    />
}

export default Spinner;