import Button from '@mui/material/Button'
import { Box, Paper, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
function Header({titlePage}) {
    return (
        <Paper elevation={2} sx={{bgcolor:'primary.light', marginBottom:'20px'}}>
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'space-between', padding: '10px'}}>
            <DoubleArrowOutlinedIcon sx={{color: '#fff' , fontSize:'30px'}}/>
                <Typography variant='h5' sx={{color: '#fcff00' }}>
                   
                    {titlePage!='Home' ? titlePage + '     Management': titlePage}</Typography>
                <AccountCircleOutlinedIcon sx={{fontSize: '30px', color: '#fff' }}/>
            </Box>
        </Paper>
    )
}

export default Header
