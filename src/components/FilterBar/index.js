import { Box, IconButton, Paper, TextField, Typography } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

function FilterBar({ search, isFilter, handleFilter, updateSearch, handleAdd }) {
    return (
        <Paper
            elevation={1}
            sx={{
                display: 'flex',
                alignItems: ' center',
                justifyContent: 'space-between',
                padding: '10px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    size="small"
                    id="outlined-basic"
                    label="Tìm kiếm"
                    variant="outlined"
                    value={search ? search : ''}
                    onChange={(e) => updateSearch(e.target.value)}
                />
                <IconButton color={isFilter ? 'secondary' : 'primary'} onClick={handleFilter}>
                    <FilterListOutlinedIcon />
                </IconButton>
            </Box>
            {/* Add button */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" color='primary'>Tạo</Typography>
                <IconButton color="primary" onClick={handleAdd}>
                    <AddCircleOutlineOutlinedIcon />
                </IconButton>
            </Box>
        </Paper>
    )
}

export default FilterBar
