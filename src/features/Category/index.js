import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined'
import { Button, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'

import FilterBar from '~/components/FilterBar'
import MainTable from '~/components/MainTable'
import useGetApi from '~/customizes/useGetApi'
import CategoryService from '~/services/CategoryService'
import AddCategoryModal from './components/AddCategory'
import DeleteCategory from './components/DeleteCategory'
import Filter from './components/Filter'
import Notification from './components/Notification'
import UpdateCategoryModal from './components/UpdateCategory'

// function createData(idCategory, nameCategory, idParent) {
//     return {
//         idCategory,
//         nameCategory,
//         idParent,
//     }
// }

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

const getFilter = (filter)=>{
    let filterData = { ...filter }
            if (filterData.idParent === 'all') {
                delete filterData.idParent
            }
    return filterData
}

export default function Category() {
    // const [isLoading, setIsLoading] = useState(true)
    const {
        isLoading,
        message,
        res: categoriesList,
        callApi: getCategories,
        openNotice,
        disableNotice,
    } = useGetApi(CategoryService.getAll)

    //Search and filter
    const [filter, setFilter] = useState({ idParent: 'all', nameCategory: '' })
    const [openFilter, setOpenFilter] = useState(false)

    //Open Modal State
    const [currentCategory, setCurrentCategory] = useState({})
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    //Sort and pagination
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('calories')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    //Search and filter
    useEffect(() => {
        // console.log("filter change", filter)
        const idSetTimeout = setTimeout(() => {
        
            console.warn('filter data: ', filter)
            getCategories(getFilter(filter))
            setPage(0)
            clearTimeout(idSetTimeout)
        }, 500)

        return () => {
            if (idSetTimeout) clearTimeout(idSetTimeout)
        }
    }, [filter])

    //Update Filter Search
    const updateSearch = (data) => {
        setFilter({ ...filter, nameCategory: data })
    }
    //open update modal
    const openUpdateModal = (category) => {
        setCurrentCategory(category)
        setUpdateModal(true)
    }

    //open delete modal
    const openDeleteModal = (category) => {
        setCurrentCategory(category)
        setDeleteModal(true)
    }

    //Sort
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }
    //Pagination
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <FilterBar
                search={filter.nameCategory}
                updateSearch={updateSearch}
                handleFilter={() => setOpenFilter(true)}
                handleAdd={() => setAddModal(true)}
                isFilter={filter.idParent!=='all'}
            />
            <MainTable
                headCells={headCells}
                isLoading={isLoading}
                length={categoriesList?.length}
                page={page}
                handleChangePage={handleChangePage}
                setPage={setPage}
                orderBy={orderBy}
                order={order}
                handleRequestSort={handleRequestSort}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            >
                {categoriesList
                    ?.slice()
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`

                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.idCategory}>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                    align="center"
                                >
                                    {row.idCategory}
                                </TableCell>
                                <TableCell align="center">{row.nameCategory}</TableCell>
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
                                    <IconButton color="error" onClick={() => openDeleteModal(row)}>
                                        <DeleteForeverOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
            </MainTable>

            <Button
                variant="contained"
                // onClick={() => getCategories()}
            >
                Refesh data
            </Button>

            {addModal && (
                <AddCategoryModal
                    categoriesList={categoriesList}
                    close={(isAdd) => {
                        setAddModal(false)
                        isAdd && getCategories(getFilter(filter))
                    }}
                />
            )}
            {updateModal && (
                <UpdateCategoryModal
                    category={currentCategory}
                    categoriesList={categoriesList}
                    close={(isUpdate) => {
                        setUpdateModal(false)
                        isUpdate && getCategories(getFilter(filter))
                    }}
                />
            )}
            {deleteModal && (
                <DeleteCategory
                    category={currentCategory}
                    close={(isDelete) => {
                        setDeleteModal(false)
                        if(page>(Math.ceil((categoriesList.length-1)/rowsPerPage)-1))
                            setPage(page-1)
                        isDelete && getCategories(getFilter(filter))
                    }}
                />
            )}

            {openNotice && (
                <Notification
                    {...message}
                    close={() => {
                        disableNotice()
                    }}
                />
            )}

            {openFilter && (
                <Filter filter={filter} setFilter={setFilter} close={() => setOpenFilter(false)} />
            )}
        </Box>
    )
}
