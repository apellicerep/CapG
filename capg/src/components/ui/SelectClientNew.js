import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import url from '../../utils/url.js'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectClientNew({ client, onChange }) {
    const classes = useStyles();
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchClients = async () => {
        try {
            const { data } = await axios.get(`${url.apiBaseUrl}/clients`)
            console.log("clientes", data.data)
            setClients(data.data)


        } catch (err) {
            //history.push('/error')
        }
    }

    useEffect(() => {
        fetchClients()
        setLoading(false)
        // eslint-disable-next-line
    }, []);

    if (loading) return null

    return (

        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={client}
                    name='clientId'
                    onChange={(e) => onChange(e)}
                    required
                >
                    {clients.map((client, i) => <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>)}
                    {/* <MenuItem value={client}>hola</MenuItem> */}
                </Select>
            </FormControl>
        </div>

    )
}