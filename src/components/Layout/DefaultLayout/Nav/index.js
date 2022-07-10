import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import { Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import NavItem from './NavItem'



export default function Nav({setTitlePage}) {
    return (
        <Paper sx={{ width: '100%', bgcolor: 'primary.light', color: '#fff'}} elevation={2}>
            <Box sx={{display:'flex', alignItems: 'center', justifyContent:'center', padding: '10px 0'}}>
                <SentimentSatisfiedAltOutlinedIcon sx={{color: '#fcff00',fontSize: '50px'}}/>
                <Typography variant='h5'>Tbook Admin</Typography>
            </Box>
            <Divider sx={{bgcolor:'#fff'}}/>
            <nav >
                <List>                
                    <NavItem to='/' title='Home' end icon={<HomeOutlinedIcon />} setTitlePage={setTitlePage}/>
                    <NavItem to='/category' title='Category' icon={<CategoryOutlinedIcon />} setTitlePage={setTitlePage}/>
                    <NavItem to='/book' title='Book' icon={<MenuBookOutlinedIcon />} setTitlePage={setTitlePage}/>
                    <NavItem to='/order' title='Order' icon={<LocalMallOutlinedIcon />} setTitlePage={setTitlePage}/>
                </List>
            </nav>
            
    </Paper>
    )
}
