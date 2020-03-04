import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: '17rem',

        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    spanAss: {
        color: 'grey',
        fontSize: '0.8rem',
        display: 'block'
    }
}));

export default function LinearDeterminate({ prog, startDate, endDate }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography component='span'
                        className={classes.spanAss}>
                        Start date:
                    </Typography>
                    {startDate}
                </Grid>
                <Grid item>
                    <Typography component='span'
                        className={classes.spanAss}>
                        End date:
                    </Typography>
                    {endDate}
                </Grid>
            </Grid>

            <LinearProgress variant="determinate" value={prog} color="secondary" />
            <Grid
                container
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    0%
                </Grid>
                <Grid item>
                    {prog}%
                </Grid>
            </Grid>

        </div>
    );
}