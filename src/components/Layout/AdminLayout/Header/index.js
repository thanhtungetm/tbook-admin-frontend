import { makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

function Header() {
    const classes = useStyles()
    return (
        <Paper className={classes.paper}>
            <Typography variant="h5">Header</Typography>
        </Paper>
    )
}

export default Header
