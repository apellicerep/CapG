import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Panel from '../ui/Panel'
import axios from 'axios'
import url from '../../utils/url.js'
import LinearProgress from '../ui/LinearProgress'

export default function Main() {
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)

    const fecthAssignments = async () => {
        try {
            const { data } = await axios.get(`${url.apiBaseUrl}/assignments`)
            setAssignments(data)
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
        <Container maxWidth="md" disableGutters='true'>
            <Panel />
        </Container>
    )
}