import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Assignment from '../ui/Assignment'
import axios from 'axios'
import url from '../../utils/url.js'
import LinearProgress from '../ui/LinearProgress'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },

}));

export default function Main() {
    const classes = useStyles();
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)

    const fecthAssignments = async () => {
        try {
            const { data } = await axios.get(`${url.apiBaseUrl}/assignments`)
            console.log(data.data)
            setAssignments(data.data)
            setLoading(false)
        } catch (err) {
            //history.push('/error')
        }
    }

    useEffect(() => {
        fecthAssignments()
        // eslint-disable-next-line
    }, []);

    if (loading) return <LinearProgress />

    return (
        <Container maxWidth="md" disableGutters={true}>
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
                {assignments.map((item, index) => <Assignment index={index} key={item.id} item={item} />)}
            </List>
        </Container>
    )
}