import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import {
    createTheme,
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles'
import Header from './Header'
import Nav from './Nav'

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#28282b',
            contrastText: '#000',
        },
        // text: '#dededf',
        textNav: '#dededf',
        action: {
            active: '#fff',
            hover: 'rgba(160,160,163,0.3)',
            selected: '#ec407a',
        },
        type: 'light',
    },
})

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // maxHeight: '100vh',
        // overflow: 'hidden',

        padding: theme.spacing(2),
    },
    wrap: {
        // height: '100vh',
        width: '100%',
    },
}))

function AdminLayout({ children }) {
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <Grid container spacing={1} className={classes.wrap}>
                    <Grid item xs={12} sm={12} md={3}>
                        <Nav />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} className={classes.wrap}>
                        <Header />
                        {children}
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    )
}
export default AdminLayout
