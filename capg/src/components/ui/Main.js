import React, { useState, useEffect, useContext } from 'react';
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
import Header2 from './Header2'
import AuthContext from '../context/auth/authContext'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    grey: {
        color: 'grey',
        marginLeft: theme.spacing(4)
    }
}));

export default function Main() {
    const authContext = useContext(AuthContext)
    const { name, isAuthenticated } = authContext

    const classes = useStyles();
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    const fecthAssignments = async () => {
        try {
            const { data } = await axios.get(`${url.apiBaseUrl}/assignments`)
            setAssignments(data.data)
            setLoading(false)
        } catch (err) {
            //history.push('/error')
        }
    }

    useEffect(() => {
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (isAuthenticated) fecthAssignments()
        // eslint-disable-next-line
    }, [loading, isAuthenticated]);

    function setRefresh() {
        setLoading(true)
    }

    const buscador = value => setSearch(value)


    const assignmentsFiltered = (search !== "") ?
        assignments.filter(item => (item.name.toLowerCase().includes(search.toLowerCase())) ||
            (item.Client.name.toLowerCase().includes(search.toLocaleLowerCase())) ? true : false)
        : assignments


    if (!isAuthenticated) return null
    if (loading) return <LinearProgress />


    return (
        <>
            <Header2 userName={name} />

            <Container maxWidth="md" disableGutters={true}>
                {assignments.length ?
                    <>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                            <Grid item  >
                                <SearchBar buscador={buscador} search={search} />
                            </Grid>
                            <Grid item>
                                <DialogAssignmentNew setRefresh={setRefresh} assignments={assignments} />
                            </Grid>
                        </Grid>
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
                    </>
                    :
                    <Typography variant='h6' className={classes.grey}>
                        Empty
                    </Typography>
                }
            </Container>

        </>
    )
}