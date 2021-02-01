import React from 'react'
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import useStyles from './Bts.style';

/* 
    Submit buttons for Forms

    onClick function already provided by 
    component/form/FormWrapper
*/

const BtSubmit = (props) => {
    const classes = useStyles();
    const { fullWidth, color, text } = props;

    return <Button
        type="submit"
        variant="contained"
        fullWidth={fullWidth}
        color={color}
        className={classes.submit}
    > {text} </Button>
}

BtSubmit.defaultProps = {
    fullWidt: false,
    color: "primary"
}

BtSubmit.propTypes = {
    fullWidth: PropTypes.bool,
    color: PropTypes.string,

}

export default BtSubmit
