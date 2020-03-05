import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import moment from "moment"

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
    },
    spanAssAlarm: {
        color: '#ff002b',
        fontWeight: 'bold'
    },
    color: {
        textColor: "black"
    },
}));



// '#ff6c5c'

// rojo y amarillo
// '#ff002b' : '#FFBA60'
export default function DateLianearProgress({ prog, startDate, endDate }) {
    const classes = useStyles();

    //("moment", moment(endDate, "YYYY-MM-DD").fromNow());
    const alarm = moment(endDate).diff(moment(new Date()), 'days') < 30 ? true : false

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
                    <Typography >
                        {moment(startDate).format("DD/MM/YYYY")}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography component='span'
                        className={classes.spanAss}>
                        End date:
                    </Typography>
                    <Typography className={alarm ? classes.spanAssAlarm : null}>
                        {moment(endDate).format("DD/MM/YYYY")}
                    </Typography>

                </Grid>
            </Grid>

            <LinearProgress className={classes.linia} variant="determinate" value={prog} color="secondary" />
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