import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined'
import { Button, IconButton, Skeleton, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
import TableSkeleton from '~/components/Skeleton/TableSkeleton'
import CategoryService from '~/services/CategoryService'
import handle from '~/utils/handle'
import AddCategoryModal from './components/AddCategory'
import { EnhancedTableHead } from './components/EnhancedTableHead'
import Filter from './components/Filter'
import Notification from './components/Notification'
import UpdateCategoryModal from './components/UpdateCategory'

function createData(idCategory, nameCategory, idParent) {
    return {
        idCategory,
        nameCategory,
        idParent,
    }
}

// const categoriesList = [
//     createData(1, 'Kinh Tế', null),
//     createData(2, 'Văn học', null),
//     createData(3, 'Thiếu nhi', 1),
//     createData(4, 'Tâm lý', 1),
//     createData(5, 'Kinh dị', 2),
//     createData(6, 'Kinh Tế 1', 4),
//     createData(7, 'Kinh Tế 2', 5),
//     createData(8, 'Kinh Tế 3', 2),
//     createData(9, 'Kinh Tế 4', 2),
//     createData(10, 'Kinh Tế 5', 3),
// ]

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

const headCells = [
    {
        id: 'idCategory',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'nameCategory',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'idParent',
        numeric: true,
        disablePadding: false,
        label: 'Parent',
    },
    {
        id: 'update',
        numeric: true,
        disablePadding: false,
        label: 'Update',
        noneSort: true,
    },
    {
        id: 'delete',
        numeric: true,
        disablePadding: false,
        label: 'Delete',
        noneSort: true,
    },
]

export default function Category() {
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)

    const [message, setMessage] = useState({})

    //Set current category
    const [currentCategory, setCurrentCategory] = useState({})

    //Fetch APi
    const [isLoading, setIsLoading] = useState(true)
    const [openNotice, setOpenNotice] = useState(false)
    const [categoriesList, setCategories] = useState([])

    //Search
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState({ idParent: 'all' })
    const [openFilter, setOpenFilter] = useState(false)

    //Sort
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('calories')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    //Call API
    const getCategories = async (filter) => {
        setIsLoading(true)
        const res = await handle(CategoryService.getAll(filter))
        setIsLoading(false)
        console.log('list Category:', res)
        if (res.err) {
            setOpenNotice(true)
            setMessage({
                err: true,
                message: 'Không thể tải dữ liệu. Vui lòng thử lại sau!',
            })
            return
        }
        setCategories(res.data)
    }

    // useEffect(() => {
    //     getCategories()
    // }, [])

    //Search
    useEffect(() => {
        const idSetTimeout = setTimeout(() => {
            console.log('search data: ', search)
            console.log('filter data: ', filter)
            let filterData = { ...filter }
            if (filterData.idParent == 'all') {
                delete filterData.idParent
            }
            getCategories({ nameCategory: search, ...filterData })
            clearTimeout(idSetTimeout)
        }, 500)

        return () => {
            if (idSetTimeout) clearTimeout(idSetTimeout)
        }
    }, [search, filter])

    //Sort
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }
    //Pagingnation
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    //update
    const openUpdateModal = (category) => {
        setCurrentCategory(category)
        setUpdateModal(true)
    }

    //Remove
    const handleRemove = async (category) => {
        setOpenNotice(true)

        const res = await handle(CategoryService.delete(category.idCategory))
        setOpenNotice(true)
        if (res.err) {
            setMessage({
                err: true,
                message: `Không xóa đc vì '${category.nameCategory}' là danh mục cha!`,
            })
            return
        }
        setMessage({ message: `Đã xóa danh mục '${category.nameCategory}'!` })
        getCategories()
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoriesList.length) : 0

    return (
        <Box sx={{ width: '100%' }}>
            <Paper
                elevation={1}
                sx={{
                    display: 'flex',
                    alignItems: ' center',
                    justifyContent: 'space-between',
                    padding: '10px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: ' center' }}>
                    <TextField
                        size="small"
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IconButton
                        color="primary"
                        onClick={() => {
                            console.log(openFilter)
                            setOpenFilter(true)
                        }}
                    >
                        <FilterListOutlinedIcon />
                    </IconButton>
                </Box>
                {/* Add button */}
                <Box sx={{ display: 'flex', alignItems: ' center' }}>
                    <Typography variant="overline">Add</Typography>
                    <IconButton color="primary" onClick={() => setAddModal(true)}>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            </Paper>
            <Paper sx={{ width: '100%', mb: 2, mt: 1 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
                        <EnhancedTableHead
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        {isLoading ? (
                            <TableSkeleton />
                        ) : (
                            <TableBody>
                                {categoriesList
                                    .slice()
                                    .sort(getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.idCategory}
                                            >
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    align="center"
                                                >
                                                    {row.idCategory}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.nameCategory}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.idParent ? row.nameParent : 'root'}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => openUpdateModal(row)}
                                                    >
                                                        <SettingsSuggestOutlinedIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleRemove(row)}
                                                    >
                                                        <DeleteForeverOutlinedIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>

                {isLoading ? (
                    <Skeleton />
                ) : (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={categoriesList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>

            <Button variant="contained" onClick={() => getCategories()}>
                Refesh data
            </Button>

            {addModal && (
                <AddCategoryModal
                    categoriesList={categoriesList}
                    close={(isAdd) => {
                        setAddModal(false)
                        isAdd && getCategories()
                    }}
                />
            )}
            {updateModal && (
                <UpdateCategoryModal
                    category={currentCategory}
                    categoriesList={categoriesList}
                    close={(isUpdate) => {
                        setUpdateModal(false)
                        isUpdate && getCategories()
                    }}
                />
            )}

            {openNotice && (
                <Notification
                    {...message}
                    close={() => {
                        setOpenNotice(false)
                        setMessage({})
                    }}
                />
            )}

            {openFilter && (
                <Filter filter={filter} setFilter={setFilter} close={() => setOpenFilter(false)} />
            )}
        </Box>
    )
}
