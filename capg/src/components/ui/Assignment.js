import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'
import DateLinearProgress from './DateLinearProgress'
import Typography from '@material-ui/core/Typography'
import ConsultantChip from '../ui/ConsultantChip'
//import MoreVertMenu from '../ui/MoreVertMenu'
import DialogAssignmentEdit from './DialogAssignmentEdit'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(3),
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.3),
        },
    },
    nested2: {
        paddingLeft: theme.spacing(3),
        overflowWrap: 'break-word',
        paddingRight: theme.spacing(5),
        display: 'block',
        marginBottom: theme.spacing(4)
    },
    item: {
        marginBottom: theme.spacing(2)
    },
    item2: {
        marginRight: theme.spacing(1)
    },
    spanAss: {
        color: 'grey',
        fontSize: '0.8rem'
    },
    listItem: {
        marginBottom: theme.spacing(3)
    }
}));



/**
 * component assignment that shows the information of each individual assignment. Name,client,
 * consultant, start date,etc...
 */
export default function Assignment({ history, item, index, setRefresh }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItem className={classes.listItem} component='div'>
                {(index === 0) ? !open ? <ExpandLess className={classes.item2} onClick={handleClick} /> : <ExpandMore className={classes.item2} onClick={handleClick} /> :
                    open ? <ExpandLess className={classes.item2} onClick={handleClick} /> : <ExpandMore className={classes.item2} onClick={handleClick} />}
                <>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item className={classes.item}>
                            <Typography component='span'
                                className={classes.spanAss}>
                                Assignment:
                            </Typography>
                            <Typography>{item.name}</Typography>
                        </Grid>
                        <Grid item className={classes.item}>
                            <Typography component='span'
                                className={classes.spanAss}>
                                Client:
                            </Typography>
                            <Typography>{item.Client.name}</Typography>
                        </Grid>
                        <Grid item>
                            <DateLinearProgress
                                prog={item.percentage}
                                startDate={item.start_date}
                                endDate={item.end_date}
                            />
                        </Grid>
                    </Grid>
                </>
                <ListItemIcon >
                    <DialogAssignmentEdit history={history} setRefresh={setRefresh} itemId={item.id} />
                </ListItemIcon>
            </ListItem>
            <Collapse in={(index === 0) ? !open : open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemText className={classes.nested} secondary="Consultants:"></ListItemText>
                    <ListItem className={classes.nested}>
                        {item.Users.map(user => <ConsultantChip key={user.id} name={`${user.name} ${user.surname}`} />)}
                    </ListItem>
                    <ListItem className={classes.nested2}>
                        <ListItemText secondary='Comments:' />
                        <ListItemText primary={item.comment} />
                    </ListItem>
                </List>
            </Collapse>
        </>

    );
}