import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../components/context/auth/authContext'

const RutaPrivada = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext)
    const { isAuthenticated, loading, name } = authContext
    return (
        <Route {...rest}
            render={(props) =>
                !isAuthenticated && !loading
                    ? <Redirect to='/signin' />
                    : <Component {...props} />


            }
        />
    )
}
export default RutaPrivada