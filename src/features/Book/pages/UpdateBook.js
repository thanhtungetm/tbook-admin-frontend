import { Box, IconButton, Paper, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateBook() {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.warn('Get a book with id = ' + id)
    }, [])

    // const handleBack =()=>{
    //     navigate('/admin/book/')
    // }

    return (
        <Box>
            <Paper mb={1}>
                <Typography variant="h4">Cập nhật sách</Typography>
    
            </Paper>
            <Paper sx={{mt:1}}>
            <Typography variant="h3">UpdateBook</Typography>
                <Typography variant="h3">Developing...!</Typography>
    
            </Paper>
        </Box>
    )
}

export default UpdateBook
