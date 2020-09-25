/* 
    Footer component for every page
*/

import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Link, Container, Typography, TextField
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    //     backgroundColor: theme.palette.secondary.light,
    // },
    container: {
        margin: theme.spacing(2, 2),
        padding: 'auto',
        display: 'flex',
    },
    iconsWrapper: {
        height: 120,
    },
    icons: {
        display: 'flex',
    },
    icon: {
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.warning.main,
        marginRight: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    footer: {
        padding: theme.spacing(2, 2),
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
    },
    caption: {
        width:'100%',
        display:'block'
    }
}));



// Footer compoentn
const Footer = props => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            {/* probably add something here??? */}

            {/* how to change text color here */}
            <Typography variant="caption" align="center" className={classes.caption} >
                Copyright © {new Date().getFullYear()} Fetch
            </Typography>
        </footer>
        // <Typography component="footer" className={classes.root}>
        //     <Container className={classes.container}>
        //         <Grid container spacing={5}>
        //             <Grid item xs={6} sm={4} md={3}>
        //                 <Grid container direction="column"
        //                     justifyContent="flex-end"
        //                     className={classes.iconsWrapper}
        //                     spacing={2} >
        //                     <Grid item className={classes.icons}>
        //                         <a href="https://material-ui.com/" className={classes.icon}>
        //                             <img src="/static/themes/onepirate/appFooterFacebook.png" alt="Facebook" />
        //                         </a>
        //                         <a href="https://twitter.com/MaterialUI" className={classes.icon} >
        //                             <img src="/static/themes/onepirate/appFooterTwitter.png" alt="Twitter" />
        //                         </a>
        //                     </Grid>
        //                     <Grid item> <Copyright /> </Grid>
        //                 </Grid>
        //             </Grid>

        //             <Grid item xs={6} sm={4} md={2}>
        //                 <Typography variant="h6" marked="left" gutterBottom> Legal </Typography>
        //                 <ul className={classes.list}>
        //                     <li className={classes.listItem}> <Link href="/premium-themes/onepirate/terms/">Terms</Link> </li>
        //                     <li className={classes.listItem}> <Link href="/premium-themes/onepirate/privacy/">Privacy</Link> </li>
        //                 </ul>
        //             </Grid>

        //         </Grid>
        //     </Container>
        // </Typography>
    );
};

export default Footer;

