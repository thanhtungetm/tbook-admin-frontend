import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text,
    },
    nav: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
    },
}))

function NavItem({ title, icon, children, to, home }) {
    const classes = useStyle()
    const Icon = icon
    const [open, setOpen] = useState(false)

    const handleExpandClick = () => {
        setOpen(!open)
    }

    return (
        <Box>
            <NavLink to={to} end={home} className={classes.nav}>
                {({ isActive }) => (
                    <ListItem button selected={isActive}>
                        <ListItemIcon>
                            {Icon && <Icon className={classes.icon} />}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                        {open
                            ? children && <ExpandLess />
                            : children && <ExpandMore />}
                    </ListItem>
                )}
            </NavLink>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </Box>
    )
}

export default NavItem
