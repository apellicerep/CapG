import { createMuiTheme } from '@material-ui/core/styles';

const artBlue = "#0B72B9"
const artOrange = "#FFBA60"

/**
 * Change colors of the default theme.
 */
export default createMuiTheme({
    palette: {
        common: {
            artBlue: `${artBlue}`,
            artOrange: `${artOrange}`
        },
        primary: {
            main: `${artBlue}`
        },
        secondary: {
            main: `${artOrange}`
        }
    },
    typography: {
        h3: {
            fontWeight: 300
        }

    }
})