import React, { useState, useContext, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import AuthContext from '../context/auth/authContext'
import { Alert } from '@material-ui/lab'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://artpdev.com/">
                artpdev.com
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

/**
 * Renders the Sign In page 
 */
export default function SignIn(props) {

    const authContext = useContext(AuthContext)
    const { login, error, isAuthenticated } = authContext

    const classes = useStyles();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const { email, password } = user

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    if (isAuthenticated) props.history.push('/')


    //update state assignment from user input.
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        login({
            email,
            password
        })

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
        </Typography>
                {error &&
                    <div className={classes.form}>
                        <Alert severity="error"><Typography variant="body2">{error}</Typography></Alert>
                    </div>
                }
                <form className={classes.form} onSubmit={onSubmit} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type='email'
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={onChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
          </Button>

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}