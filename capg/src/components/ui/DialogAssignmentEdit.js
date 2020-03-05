import React, { useState } from 'react';
import moment from "moment"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TodayIcon from '@material-ui/icons/Today';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import { Alert } from '@material-ui/lab';
import { Typography } from '@material-ui/core'
import url from '../../utils/url.js'
import AutocompleteConsultantNew from './AutocompleteConsultantNew'
import SelectClientNew from './SelectClientNew'
import DateMomentUtils from '@date-io/moment'

import "moment/locale/es"
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
moment.locale("es")


const useStyles = makeStyles(theme => ({

    botonElement: {
        margin: theme.spacing(2)
    },
    textField: {
        //margin: theme.spacing(1),
        width: 200
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    margin: {
        marginBottom: theme.spacing(2)
    }
}))

const error = false

export default function DialogAssignmentEdit({ itemId, setRefresh }) {

    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [consultants, setConsultant] = useState(null)
    const [assignment, setAssignment] = useState({})

    const fecthAssignment = async () => {
        const obj = {}
        try {
            const { data } = await axios.get(`${url.apiBaseUrl}/assignments/${itemId}`)
            console.log(data.data)
            obj.clientId = data.data.Client.id
            obj.name = data.data.name
            obj.percentage = data.data.percentage
            obj.comment = data.data.comment
            setAssignment(obj)
            setConsultant(data.data.Users)
            setLoading(false)
        } catch (err) {
            //history.push('/error')
        }
    }

    const { clientId, name, percentage, comment } = assignment

    const onChange = e => setAssignment({ ...assignment, [e.target.name]: e.target.value })

    console.log(clientId, name, percentage, startDate, endDate, comment)

    const onDialogOpen = () => {
        fecthAssignment()
        setDialogOpen(true);
    };

    const onDialogClose = () => {
        setDialogOpen(false)
        setAssignment({
            clientId: "",
            name: "",
            percentage: "",
            comment: "",
        })
    }

    const onDelete = async (e) => {
        try {
            await axios.delete(`${url.apiBaseUrl}/assignments/${itemId}`)
            onDialogClose();
            setRefresh()

        } catch (err) {
            console.log(err)
        }
    }

    const onUpdate = async (e) => {
        e.preventDefault()
        const body = assignment
        body.consultants = consultants
        body.start_date = moment(startDate).format("YYYY-MM-DD")
        body.end_date = moment(endDate).format("YYYY-MM-DD")

        try {
            await axios.put(`${url.apiBaseUrl}/assignments/${itemId}`, body)
            onDialogClose();
            setRefresh()

        } catch (err) {
            console.log(err)
        }
    }

    //if (loading) return <IconButton aria-label="delete"><EditIcon /></IconButton>

    return (
        <>
            <IconButton onClick={onDialogOpen} aria-label="delete"><EditIcon /></IconButton>
            {!loading &&
                <Dialog open={dialogOpen} onClose={onDialogClose}>
                    <form className={classes.form} onSubmit={onUpdate} >
                        <DialogTitle>New Assignment</DialogTitle>
                        {error &&
                            <div className={classes.root}>
                                <Alert severity="error"><Typography variant="body2">{error}</Typography></Alert>
                            </div>
                        }
                        <DialogContent className={classes.dialog}>
                            <Grid container
                                direction="row"
                                justify="space-between"
                                alignItems="center">
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        className={classes.textField}
                                        autoFocus
                                        margin="normal"
                                        label="Name Assignment"
                                        InputProps={{ name: 'name' }}
                                        onChange={onChange}
                                        value={name}
                                        required

                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <SelectClientNew client={clientId} onChange={onChange} />
                                </Grid>
                                <Grid className={classes.margin} item xs={12} sm={6} md={6}>
                                    <MuiPickersUtilsProvider utils={DateMomentUtils}>
                                        <DatePicker
                                            autoOk
                                            disableToolbar
                                            variant="inline"
                                            format="DD/MM/YYYY"
                                            margin="normal"
                                            id="date-picker-inline1"
                                            label="Start date"
                                            name="startDate"
                                            value={startDate}
                                            onChange={setStartDate}
                                            InputProps={{
                                                name: "startDate",
                                                endAdornment: (
                                                    <TodayIcon />
                                                )
                                            }} />
                                    </MuiPickersUtilsProvider>

                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <MuiPickersUtilsProvider utils={DateMomentUtils}>
                                        <DatePicker
                                            autoOk
                                            disableToolbar
                                            variant="inline"
                                            format="DD/MM/YYYY"
                                            margin="normal"
                                            id="date-picker-inline2"
                                            name="endDate"
                                            label="End date"
                                            value={endDate}
                                            onChange={setEndDate}
                                            InputProps={{
                                                endAdornment: (
                                                    <TodayIcon />
                                                )
                                            }} />
                                    </MuiPickersUtilsProvider>

                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <AutocompleteConsultantNew consultantsDefault={consultants} setConsultant={setConsultant} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        className={classes.textField}
                                        margin="normal"
                                        label="Percentage"
                                        InputProps={{ name: 'percentage' }}
                                        onChange={onChange}
                                        value={percentage}

                                    />

                                </Grid>
                                <Grid item xs={12} sm={6} md={6} >
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
                            <Grid className={classes.container} container justify="space-between" >
                                <Grid >
                                    <Button onClick={onDelete} variant="contained" color="secondary">
                                        Delete
                            </Button>
                                </Grid>
                                <Grid >
                                    <Button onClick={onDialogClose} color="primary">
                                        Cancel
                            </Button>
                                    <Button
                                        variant="contained"
                                        // onClick={onCreate}
                                        color="primary"
                                        type="submit"
                                    >
                                        Update
                            </Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </form>
                </Dialog>
            }

        </>
    );
}