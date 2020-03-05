import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Assignment from '../ui/Assignment'
import axios from 'axios'
import url from '../../utils/url.js'
import LinearProgress from '../ui/LinearProgress'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import SearchBar from '../ui/SearchBar'
import DialogAssignmentNew from './DialogAssignmentNew'


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
    const [search, setSearch] = useState("")

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
    }, [loading]);

    function setRefresh() {
        setLoading(true)
    }

    const buscador = value => setSearch(value)


    const assignmentsFiltered = (search !== "") ?
        assignments.filter(item => (item.name.toLowerCase().includes(search.toLowerCase())) ||
            (item.Client.name.toLowerCase().includes(search.toLocaleLowerCase())) ? true : false)
        : assignments

    if (loading) return <LinearProgress />


    return (
        <Container maxWidth="md" disableGutters={true}>
            <SearchBar buscador={buscador} search={search} />
            <DialogAssignmentNew setRefresh={setRefresh} assignments={assignments} />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">

                    </ListSubheader>
                }
                className={classes.root}
            >
                {assignmentsFiltered.map((item, index) => <Assignment setRefresh={setRefresh} index={index} key={item.id} item={item} />)}
            </List>
        </Container>
    )
}