import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        color: '#fff',
    },
    list: {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '15px',
        padding: theme.spacing(2),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    icon: {
        color: theme.palette.text,
    },
    headNav: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px 0',
        borderBottom: '2px white solid',
        color: '#fff',
    },
    headIcon: {
        color: theme.palette.text,
    },
}))
