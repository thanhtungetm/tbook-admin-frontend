import { createTheme, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { NavLink, useLocation} from 'react-router-dom'


function NavItem({ to, title, end, icon ,setTitlePage }) {
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname===to){
        setTitlePage(title)
    }
    })
    
    return (
        
            <NavLink style={{ textDecoration: 'none' }} to={to} end={end}>
                {({ isActive }) => (
                        <ListItem
                            disablePadding
                            sx={{
                                color: '#fff',
                                transition: 'all 0.3s linear',
                                '&:hover': { bgcolor: 'rgba(0, 40, 132, 0.1)' },
                                bgcolor: isActive ? 'rgba(0, 40, 132, 0.3)': undefined
                            }}
                        >
                            <ListItemButton selected={isActive}>
                                <ListItemIcon sx={{ color: '#fff' }}>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItemButton>
                        </ListItem>
                )}
            </NavLink>
        
    )
}

export default NavItem
