import React, { useState } from 'react';
import moment from "moment"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TodayIcon from '@material-ui/icons/Today';
import axios from 'axios'
import { Alert } from '@material-ui/lab';
import { Typography } from '@material-ui/core'
import url from '../../utils/url.js'
import AutocompleteConsultantNew from './AutocompleteConsultantNew'
import SelectPercentage from './SelectPercentage'
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
        margin: theme.spacing(2),
    },
    textField: {
        //margin: theme.spacing(1),
        width: 200,
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


/**
 * New Assignment Form
 */
export default function DialogAssignmentNew({ history, assignments, setRefresh }) {

    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [consultants, setConsultant] = useState("")
    const [errors422, setErrors422] = useState(null)
    const [errors400, setErrors400] = useState(null)
    const [assignment, setAssignment] = useState({
        clientId: "",
        name: "",
        percentage: "",
        comment: "",
    })

    //get array Clients
    //const arrayClients = assignments.map(item => item.Client.name)
    const arrayClients = [...new Set(assignments.map(item => item.Client.name))]

    const { clientId, name, percentage, comment } = assignment

    //update state assignment from user input.
    const onChange = e => setAssignment({ ...assignment, [e.target.name]: e.target.value })

    const onDialogOpen = () => {
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
        setErrors400(null)
        setErrors422(null)
    }

    const onCreate = async (e) => {
        e.preventDefault()
        const body = assignment
        body.consultants = consultants
        body.start_date = moment(startDate).format("YYYY-MM-DD")
        body.end_date = moment(endDate).format("YYYY-MM-DD")

        try {
            await axios.post(`${url.apiBaseUrl}/assignments`, body)
            onDialogClose();
            setRefresh()

        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    //console.log(err.response.data.errors)
                    const errorsMsg = err.response.data.errors.map(error => error.msg)
                    setErrors400(errorsMsg)
                    setErrors422(null)

                } else if (err.response.status === 422) {
                    const errorsMsg = err.response.data.message
                    setErrors422(errorsMsg)
                    setErrors400(null)
                } else {
                    //error 500
                    history.push('/error')
                }
            } else {
                //console.log(err.request)
                history.push('/error')
            }
        }
    }


    return (
        <>
            {/* <Button onClick={onDialogOpen} className={classes.botonElement} size="small" variant="contained" color="primary">+</Button> */}
            <Fab onClick={onDialogOpen} className={classes.botonElement} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <Dialog open={dialogOpen} onClose={onDialogClose}>
                <form className={classes.form} onSubmit={onCreate} >
                    <DialogTitle>New Assignment</DialogTitle>
                    {errors400 &&
                        <div className={classes.root}>
                            <Alert severity="error">{errors400.map((err, i) => <Typography key={i} variant="body2">{err}</Typography>)}</Alert>
                        </div>
                    }
                    {errors422 &&
                        <div className={classes.root}>
                            <Alert severity="error"><Typography variant="body2">{errors422}</Typography></Alert>
                        </div>
                    }
                    <DialogContent className={classes.dialog}>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    className={classes.textField}
                                    autoFocus
                                    margin="normal"
                                    label="Name Assignment:"
                                    InputProps={{ name: 'name' }}
                                    onChange={onChange}
                                    value={name}

                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <SelectClientNew clients={arrayClients} history={history} client={clientId} onChange={onChange} />
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
                                        label="Start date:"
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
                                        label="End date:"
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
                                <AutocompleteConsultantNew setConsultant={setConsultant} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <SelectPercentage percentage={percentage} onChange={onChange} />

                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                <TextField
                                    className={classes.textField}
                                    margin="normal"
                                    label="Comment:"
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

        </>
    );
}