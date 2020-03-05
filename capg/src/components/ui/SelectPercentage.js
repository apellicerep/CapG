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
        marginTop: theme.spacing(2.3),
        width: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SelectClientNew({ percentage, onChange }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    console.log(percentage)

    return (

        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Percentage:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={percentage}
                    name='percentage'
                    onChange={(e) => onChange(e)}
                    required
                >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={75}>75</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
        </div>

    )
}