/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import url from '../../utils/url.js'

const useStyles = makeStyles(theme => ({
    root: {
        width: 200,
        // '& > * + *': {
        //     marginTop: theme.spacing(3),
        // },
        marginTop: 18
    },
}));

export default function AutocompleteConsultantNew({ setConsultant, consultantsDefault }) {
    const classes = useStyles();
    const [consultants, setConsultants] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchConsultants = async () => {
        try {
            const { data } = await axios.get(`${url.apiBaseUrl}/users`)
            console.log("consultant", data.data)
            setConsultants(data.data)


        } catch (err) {
            // //history.push('/error')
        }
    }
    useEffect(() => {
        fetchConsultants()
        setLoading(false)
        // eslint-disable-next-line
    }, []);

    if (loading) return null
    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={consultants}
                getOptionLabel={option => `${option.name} ${option.surname}`}
                defaultValue={consultantsDefault}
                // eslint-disable-next-line
                onChange={(e, value) => {
                    console.log(value)
                    // eslint-disable-next-line
                    return setConsultant(value)
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="filterSelectedOptions"
                        placeholder="Favorites"
                    />
                )}
            />
        </div>

    );
}
