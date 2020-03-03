import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Grid from '@material-ui/core/Grid'
import { IconButton } from '@material-ui/core';
import DateLinearProgress from '../ui/DateLinearProgress'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(3),
    },
    item: {
        marginBottom: theme.spacing(2)
    },
    item2: {
        marginRight: theme.spacing(1)
    },

}));

export default function Panel() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Assignments:
        </ListSubheader>
                }
                className={classes.root}
            >

                <ListItem >
                    {open ? <ExpandLess className={classes.item2} onClick={handleClick} /> : <ExpandMore className={classes.item2} onClick={handleClick} />}
                    <ListItemText primary={
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography className={classes.item}>
                                    Payments
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.item}>
                                    Ikea
                                </Typography>
                            </Grid>
                            <Grid item>
                                <DateLinearProgress prog={70} />
                            </Grid>
                        </Grid>
                    } />

                    <ListItemIcon >
                        <IconButton>
                            <MoreVertIcon className={classes.item3} />
                        </IconButton>

                    </ListItemIcon>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem >
                    {open ? <ExpandLess className={classes.item2} onClick={handleClick} /> : <ExpandMore className={classes.item2} onClick={handleClick} />}
                    <ListItemText primary={
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography className={classes.item}>
                                    Ux Design
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.item}>
                                    Ica
                                </Typography>
                            </Grid>
                            <Grid item>
                                <DateLinearProgress prog={50} />
                            </Grid>
                        </Grid>
                    } />

                    <ListItemIcon >
                        <IconButton>
                            <MoreVertIcon className={classes.item3} />
                        </IconButton>

                    </ListItemIcon>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>


        </>

    );
}