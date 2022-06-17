import {
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from '@material-ui/core'
const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: theme.palette.text,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    icon: {
        color: theme.palette.text,
    },
}))
function SubItem({ title, icon }) {
    const classes = useStyle()
    const Icon = icon
    return (
        <ListItem button className={classes.nested}>
            <ListItemIcon>
                <Icon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={title} />
        </ListItem>
    )
}

export default SubItem
