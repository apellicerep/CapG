import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import setAuthtoken from '../utils/setAuthtoken'
import RutaPrivada from './PrivateRoute'
import PageNotFound from './ui/PageNotFound'
import SignIn from './ui/SignIn'
import ErrorPage from './ui/ErrorPage'
import AuthState from './context/auth/AuthState'
import { ThemeProvider } from '@material-ui/styles'
import theme from './ui/Theme'
import Main from './ui/Main'

if (localStorage.token) {
  setAuthtoken(localStorage.token)
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <Router>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <RutaPrivada exact path="/" component={Main} />
            <RutaPrivada exact path="/error" component={ErrorPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </AuthState>
    </ThemeProvider>

  );
}

export default App;
