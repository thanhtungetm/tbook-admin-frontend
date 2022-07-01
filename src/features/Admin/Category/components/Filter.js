import CategoryService from "~/services/CategoryService"

const { Paper, Box, InputLabel, Select, MenuItem, Button, Typography } = require("@mui/material")
const { useState, useEffect } = require("react")
const { default: Modal } = require("~/components/Modal")
const handle = require("~/utils/handle")

export default function Filter({ filter, setFilter, close }) {
    const [categoriesList, setCategories] = useState([])
    const [idParent, setIdParent] = useState(filter.idParent) 
    //Call API
    const getCategories = async (filter) => {
        const res = await handle(CategoryService.getAll())
        console.log('list Category:', res)
        if (res.err) {
            return
        }
        setCategories(res.data)
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <Modal>
            <Paper>
                <Paper
                    sx={{
                        bgcolor: 'primary.light',
                        color: '#fff',
                        padding: '5px 0',
                    }}
                >
                    <Typography align="center" variant="h5">
                        Filter {filter.idParent}
                    </Typography>
                </Paper>

                <Box mt={2} sx={{ padding: '10px' }}>
                        <InputLabel id="parent-label">Parent</InputLabel>
                                <Select
                                    size="small"
                                    labelId="parent-label"
                                    id="demo-simple-select"
                                    value={idParent}
                                    label="Parent"
                                    onChange={(e)=>setIdParent(e.target.value)}
                                    sx={{ width: 210 }}
                                >
                                    <MenuItem value="all">
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value="">
                                        <em>root</em>
                                    </MenuItem>
                                    
                                    {categoriesList.map((cate) => (
                                        <MenuItem key={cate.idCategory} value={cate.idCategory}>
                                            {cate.nameCategory}
                                        </MenuItem>
                                    ))}
                                </Select>
                    <Box
                        mt={1}
                        sx={{
                            display: 'flex',
                            alignItems: ' center',
                            justifyContent: 'center',
                        }}
                    >
                        <Button variant="outlined" onClick={()=>{setFilter({idParent}); close()}} type="submit">
                            Ok
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    )
}