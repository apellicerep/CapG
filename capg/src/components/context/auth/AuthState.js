import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import setAuthtoken from '../../../utils/setAuthtoken'
import url from '../../../utils/url.js'

import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types'


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        name: null,
        error: null,

    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    //Load User, check loaged user to keep state update.
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthtoken(localStorage.token)
        }

        try {

            const res = await axios.get(`${url.apiBaseUrl}/auth`)
            dispatch({
                type: USER_LOADED,
                payload: {
                    name: res.data.name
                }
            })
            //console.log("loadUser")
        } catch (err) {
            dispatch({ type: AUTH_ERROR })
        }
    }

    //Login User
    const login = async formData => {
        //console.log(url)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`${url.apiBaseUrl}/auth`, formData, config)

            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.data.token
                }
            })
            //console.log("login")

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg,
            })
        }
    }
    //Logout
    const logout = () => dispatch({ type: LOGOUT })

    //Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                name: state.name,
                loading: state.loading,
                error: state.error,
                login,
                loadUser,
                logout,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState