import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Container } from '@material-ui/core';
import AuthContext from '../context/auth/authContext'
import LinearProgress from '../ui/LinearProgress'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '3rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


/**
 * App Bar Header
 */
export default function Header2({ userName, loading }) {
    const authContext = useContext(AuthContext)
    const { logout } = authContext
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        logout()
        setAnchorEl(null);

    }

    return (
        <div className={classes.root}>
            <AppBar position="static">

                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        CapGTrack
          </Typography>
                    {auth && (
                        <div>
                            {userName}
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >

                                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
                {loading && <LinearProgress />}
            </AppBar>
        </div>
    );
}