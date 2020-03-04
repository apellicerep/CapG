import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import { Alert } from '@material-ui/lab';
import { Typography } from '@material-ui/core'
import LinearProgress from '../ui/LinearProgress'
import url from '../../utils/url.js'
import AutocompleteConsultant from './AutocompleteConsultant'
import SelectClient from './SelectClient'


const useStyles = makeStyles(theme => ({

    botonElement: {
        margin: theme.spacing(2)
    },
    textField: {
        margin: theme.spacing(1),
        width: 200,
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}))

const error = false

export default function DialogAssignment({ assignments }) {

    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(true)
    const [assignment, setAssignment] = useState({
        consultantName: "",
        client: "",
        nameAssignment: "",
        percentage: "",
        startDate: "",
        endDate: "",
        comment: "",
    })

    //get array Consultants
    const seen = new Set()
    const arrayConsultants = assignments.reduce((acc, value) => {
        acc = value.Users.concat(acc)
        return acc
    }, []).filter(item => {
        const duplicate = seen.has(item.id)
        seen.add(item.id)
        return !duplicate
    })

    //get array Clients
    const arrayClients = assignments.map(item => item.Client.name)


    const { consultantName, client, nameAssignment, percentage, startDate, endDate, comment } = assignment

    const onChange = e => setAssignment({ ...assignment, [e.target.name]: e.target.value })

    console.log(consultantName, client, nameAssignment, percentage, startDate, endDate, comment)

    const onDialogOpen = () => {
        setDialogOpen(true);
    };

    const onDialogClose = () => {
        setDialogOpen(false)
        setAssignment({
            consultantName: "",
            client: "",
            nameAssignment: "",
            percentage: "",
            startDate: "",
            endDate: "",
            comment: "",
        })
    }

    const onSnackbarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
        setSnackbarMessage('');
    };

    // if (loading) return <LinearProgress />

    return (
        <>
            <Button onClick={onDialogOpen} className={classes.botonElement} size="small" variant="contained" color="primary">New Assignment</Button>

            <Dialog open={dialogOpen} onClose={onDialogClose}>
                <form className={classes.form} onSubmit={null} >
                    <DialogTitle>New Assignment</DialogTitle>
                    {error &&
                        <div className={classes.root}>
                            <Alert severity="error"><Typography variant="body2">{error}</Typography></Alert>
                        </div>
                    }
                    <DialogContent className={classes.dialog}>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    autoFocus
                                    margin="normal"
                                    label="Name Assignment"
                                    InputProps={{ name: 'nameAssignment' }}
                                    onChange={onChange}
                                    value={nameAssignment}
                                    required

                                />
                            </Grid>

                            <Grid item xs={6}>
                                <SelectClient clients={arrayClients} client={client} onChange={onChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    label="Start Date"
                                    InputProps={{ name: 'startDate' }}
                                    onChange={onChange}
                                    value={startDate}
                                    required

                                />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    label="End date"
                                    InputProps={{ name: 'endDate' }}
                                    onChange={onChange}
                                    value={endDate}
                                    required

                                />

                            </Grid>
                            <Grid item xs={12}>
                                <AutocompleteConsultant consultants={arrayConsultants} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    label="Percentage"
                                    InputProps={{ name: 'percentage' }}
                                    onChange={onChange}
                                    value={percentage}

                                />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    label="Comment"
                                    InputProps={{ name: 'comment' }}
                                    onChange={onChange}
                                    value={comment}
                                />

                            </Grid>



                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onDialogClose} color="primary">
                            Cancel
          </Button>
                        <Button
                            variant="contained"
                            // onClick={onCreate}
                            color="primary"
                            type="submit"
                        >
                            Create
          </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={onSnackbarClose}
                autoHideDuration={4000}
            />
        </>
    );
}