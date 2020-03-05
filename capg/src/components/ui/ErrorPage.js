import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    paper: {

        margin: theme.spacing(10),
        padding: theme.spacing(10),
    },
    link: {
        marginTop: theme.spacing(4)
    }
}));
export default function ErrorPage({ history }) {
    const classes = useStyles()
    const preventDefault = e => {
        e.preventDefault()
        history.push('/')
    }
    return (
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                <Typography variant="h3" gutterBottom>
                    Error 500:
            </Typography>
                <Typography variant="h3" gutterBottom>
                    Server Error :(
            </Typography>
                <Divider />

                <Typography className={classes.link} variant="h5" gutterBottom>
                    <Link href="#" onClick={preventDefault} >Go Back</Link>
                </Typography>

            </Paper>
        </Container>
    )
}