import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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



/**
 * Component that represents the percentage of completition of the project and shows the start and end date of the project.
 * the component alerts to the Manager on the Assignments where the end date is 1 month ahead. 
 */
export default function DateLianearProgress({ prog, startDate, endDate }) {
    const classes = useStyles();
    //check how many days ahead from end date.
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