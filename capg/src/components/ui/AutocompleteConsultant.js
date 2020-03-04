/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

export default function AutocompleteConsultant({ consultants }) {
    const classes = useStyles();
    return (

        <Autocomplete
            multiple
            id="tags-standard"
            options={consultants}
            getOptionLabel={option => option.name}
            // defaultValue={[null]}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="standard"
                    label="filterSelectedOptions"
                    placeholder="Favorites"
                />
            )}
        />

    );
}
