import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from './NavBar.style'

const NavLink = props => {
    const classes = useStyles();
    const { dir, label } = props;

    return (
        <Link to={dir}>
            <Button className={classes.menuLink}>
                <Typography variant='h6'>
                    {label}
                </Typography>
            </Button>
        </Link>
    )
}

NavLink.propType = {
    dir: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}

export default NavLink;