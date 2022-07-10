import Notification from '~/components/Notification'
import useGetApi from '~/customizes/useGetApi'
import CategoryService from '~/services/CategoryService'

const {
    Paper,
    Box,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
    Skeleton,
} = require('@mui/material')
const { useState, useEffect } = require('react')
const { default: Modal } = require('~/components/Modal')

export default function Filter({ filter, setFilter, close }) {
    const {
        res: categoriesList,
        callApi: getCategories,
        openNotice,
        message,
        disableNotice,
    } = useGetApi(CategoryService.getAll)

    const [idParent, setIdParent] = useState(filter.idParent)

    useEffect(() => {
        getCategories()
    }, [])

    const handleClose = () => {
        console.log('Filter width idParent', idParent)
        if (filter.idParent !== idParent) setFilter({ ...filter, idParent })
        close()
    }
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
                        Filter
                    </Typography>
                </Paper>

                <Box mt={1} sx={{ padding: '10px' }}>
                    <InputLabel id="parent-label">Parent</InputLabel>
                    {categoriesList ? (
                        <Select
                            size="small"
                            labelId="parent-label"
                            id="demo-simple-select"
                            value={idParent}
                            label="Parent"
                            onChange={(e) => setIdParent(e.target.value)}
                            sx={{ width: 210 }}
                        >
                            <MenuItem value="all">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="">
                                <em>root</em>
                            </MenuItem>

                            {categoriesList?.map((cate) => (
                                <MenuItem key={cate.idCategory} value={cate.idCategory}>
                                    {cate.nameCategory}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <Skeleton
                            variant="rectangular"
                            sx={{ borderRadius: '8px', mt: 1 }}
                            width={210}
                            height={40}
                        />
                    )}
                    <Box
                        mt={1}
                        sx={{
                            display: 'flex',
                            alignItems: ' center',
                            justifyContent: 'center',
                        }}
                    >
                        <Button variant="outlined" onClick={handleClose} type="submit">
                            Ok
                        </Button>
                    </Box>
                </Box>
                {openNotice&&<Notification secondary {...message} onClick={disableNotice} />}
            </Paper>
        </Modal>
    )
}
