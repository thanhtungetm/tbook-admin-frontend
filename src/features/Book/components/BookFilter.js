import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Skeleton,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import Modal from '~/components/Modal'
import Notification from '~/components/Notification'
import useGetApi from '~/customizes/useGetApi'
import BookService from '~/services/BookService'
import CategoryService from '~/services/CategoryService'
import { shallowEqual } from '~/utils/func'


export default function BookFilter(props) {
    const { currentFilter, handleFilter, defaultFilter, close } = props

    const [filter, setFilter] = useState(currentFilter)

    const {
        res: categoriesList,
        callApi: getCategories,
        message: categoryMessage,
        openNotice: errGetCategory,
        disableNotice: disableCategoryNotice,
    } = useGetApi(CategoryService.getAll)
    const {
        res: authorList,
        callApi: getAuthors,
        message: authorMessage,
        openNotice: errGetAuthor,
        disableNotice: disableAuthorNotice,
    } = useGetApi(BookService.getAuthor)

    useEffect(() => {

        getCategories()
       
        getAuthors()
    }, [])

    const handleClose = () => {
        if (!shallowEqual(filter, currentFilter)) handleFilter(filter)
        close()
    }
    const handleResetFilter = () => {
        setFilter(defaultFilter)
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
                    <Box>
                        {/* Price range */}
                        <Box>
                            <TextField
                                id="priceFrom"
                                label="From"
                                value={filter?.priceFrom}
                                type="number"
                                onChange={(e) =>
                                    setFilter({ ...filter, priceFrom: e.target.value })
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                            />
                            <TextField
                                id="priceTo"
                                label="To"
                                value={filter?.priceTo}
                                onChange={(e) => setFilter({ ...filter, priceTo: e.target.value })}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                sx={{ paddingLeft: '5px' }}
                            />
                        </Box>
                        {/* Category */}
                        {categoriesList ? 
                        (<FormControl fullWidth sx={{ marginTop: '10px' }}>
                            <InputLabel id="category">Catrgory</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={filter?.idCategory}
                                label="Category"
                                onChange={(e) =>
                                    setFilter({ ...filter, idCategory: e.target.value })
                                }
                            >
                                <MenuItem value={'all'}>All</MenuItem>

                                {categoriesList?.map((cate) => (
                                    <MenuItem key={cate.idCategory} value={cate.idCategory}>
                                        {cate.nameCategory}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>)
                        :
                        <Skeleton variant="rectangular"  sx={{borderRadius: '8px', mt:1}} width={417} height={54} />
                        }
                    </Box>
                    <Box>
                        {/* Author */}
                        {authorList ? 
                        (<FormControl fullWidth sx={{ marginTop: '10px' }}>
                            <InputLabel id="author">Author</InputLabel>
                            <Select
                                labelId="author"
                                id="author"
                                value={filter?.author}
                                label="Author"
                                onChange={(e) => setFilter({ ...filter, author: e.target.value })}
                            >
                                {/* <em> */}
                                <MenuItem value={'all'}>All</MenuItem>
                                {/* </em> */}
                                {authorList?.map((author) => (
                                    <MenuItem key={author.author} value={author.author}>
                                        {author.author}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>)
                        : <Skeleton variant="rectangular"  sx={{borderRadius: '8px', mt:1}} width={417} height={54} />
                        }
                        {/* Status */}
                        <FormControl fullWidth sx={{ marginTop: '10px' }}>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                value={filter?.status}
                                label="Status"
                                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                            >
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={0}>Disable</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box
                        mt={1}
                        sx={{
                            display: 'flex',
                            alignItems: ' center',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="outlined"
                            sx={{ margin: '0 5px' }}
                            onClick={handleClose}
                            type="submit"
                        >
                            Ok
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ margin: '0 5px' }}
                            onClick={handleResetFilter}
                            type="submit"
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>
                {errGetCategory && (
                    <Notification secondary {...categoryMessage} close={() => disableCategoryNotice()} />
                )}
                {errGetAuthor && (
                    <Notification secondary {...authorMessage} close={() => disableAuthorNotice()} />
                )}
            </Paper>
        </Modal>
    )
}
