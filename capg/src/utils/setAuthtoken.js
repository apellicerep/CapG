import axios from 'axios'

/**
 * add token in headers of the http requests.
 */
const setAuthtoken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = localStorage.token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthtoken