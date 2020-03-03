import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: '16rem',

        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

export default function LinearDeterminate({ prog }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <LinearProgress variant="determinate" value={prog} color="secondary" />
            <Grid
                container
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    2019-02-30
            </Grid>
                <Grid item>
                    2019-05-20
            </Grid>
            </Grid>

        </div>
    );
}