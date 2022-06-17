import { Box, makeStyles } from '@material-ui/core'
import CachedRoundedIcon from '@material-ui/icons/CachedRounded'

function Loading() {
    const classes = useStyles()
    return (
        <Box className={classes.loading}>
            <CachedRoundedIcon className={classes.loadingIcon} />
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    loading: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
    },
    loadingIcon: {
        fontSize: '60px',
        animation: `$loading 2s ${theme.transitions.easing.easeInOut} infinite`,
    },
    '@keyframes loading': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
}))

export default Loading
