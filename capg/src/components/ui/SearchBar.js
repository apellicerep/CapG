import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const usePaperStyles = makeStyles(theme => ({
    root2: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '16rem',
        // width: '100%',
        margin: theme.spacing(2)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));


export default function SearchBar({ buscador, search }) {
    const classes = usePaperStyles()

    return (
        <Paper component="form" className={classes.root2}>
            <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                onChange={(e) => buscador(e.target.value)}
                value={search}
                className={classes.input}
                placeholder="Search"
                inputProps={{ 'aria-label': 'buscar usuarios' }}
            />
        </Paper>
    )
}