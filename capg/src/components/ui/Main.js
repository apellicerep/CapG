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
        marginTop: theme.spacing(3)
    },
    grey: {
        color: 'grey',
        marginLeft: theme.spacing(4)
    }
}));

/**
 * Layout component,main view of the app that consume from api the list of the assignments
 * and renderes the rest of the components, also has the logic for the filter of the serchBar that
 * allows the Manager filter(through name assignment or client) assignments.
 */
export default function Main({ history }) {
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
            history.push('/error')
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

    //update state from database.
    function setRefresh() {
        setLoading(true)
    }

    const buscador = value => setSearch(value)

    //filter assignments, through name assignment or client.
    const assignmentsFiltered = (search !== "") ?
        assignments.filter(item => (item.name.toLowerCase().includes(search.toLowerCase())) ||
            filterUser(item) || (item.Client.name.toLowerCase().includes(search.toLocaleLowerCase())) ? true : false)
        : assignments

    function filterUser(item) {
        let match = false
        for (let user of item.Users) {
            if (user.name.toLowerCase().includes(search.toLowerCase())) {
                match = true
            }
        }
        return match

    }


    if (!isAuthenticated) return null
    if (loading) return <Header2 loading={loading} userName={name} />


    return (
        <>
            <Header2 loading={loading} userName={name} />

            <Container maxWidth="md" disableGutters={true}>
                {assignments.length ?
                    <>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            wrap='nowrap'
                        >
                            <Grid item  >
                                <SearchBar buscador={buscador} search={search} />
                            </Grid>
                            <Grid item>
                                <DialogAssignmentNew history={history} setRefresh={setRefresh} assignments={assignments} />
                            </Grid>
                        </Grid>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}
                        >
                            {assignmentsFiltered.map((item, index) => <Assignment history={history} setRefresh={setRefresh} index={index} key={item.id} item={item} />)}
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