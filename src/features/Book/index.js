import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import FilterBar from '~/components/FilterBar';
import MainTable from '~/components/MainTable';
import Notification from '~/components/Notification';
import useGetApi from '~/customizes/useGetApi';
import BookService from '~/services/BookService';
import { shallowEqual } from '~/utils/func';
import BookFilter from './components/BookFilter';

// function createData(idCategory, nameCategory, idParent) {
//     return {
//         idCategory,
//         nameCategory,
//         idParent,
//     }
// }

// const booksList = [
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
        id: 'idBook',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'more',
        numeric: true,
        disablePadding: false,
        label: 'More',
        noneSort: true,
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'price',
        align: 'right',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'author',
        numeric: true,
        disablePadding: false,
        label: 'Author',
    },
    {
        id: 'numberRemaining',
        numeric: true,
        disablePadding: false,
        label: 'Number',
    },
    {
        id: 'nameCategory',
        numeric: true,
        disablePadding: false,
        label: 'Name Category',
    },
]
const defaultFilter = {
    priceFrom:0,
    priceTo: 1000000,
    author: 'all',
    status:1,
    idCategory: 'all',
}
const getBookFilter = (data)=>{
    let filterData = {...data}
    const keyDefault = Object.keys(defaultFilter)
    for(let key of keyDefault){
        if(filterData[key]===defaultFilter[key])
            delete filterData[key]
    }
    return filterData
}
export default function Book() {
    //Fetch APi
    const {res:booksList, callApi: getBooks, isLoading, openNotice, disableNotice, message} = useGetApi(BookService.getAll)
    
    //Navigate
    let navigate = useNavigate();


    //Search and filter
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState(defaultFilter)
    const [openFilter, setOpenFilter] = useState(false)
    

    //Sort and pagination
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('calories')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    //Go to Update Page
    const gotoUpdatePage = (id)=>{
        navigate(`./${id}`)
    }
    const gotoCreatePage = ()=>{
        console.log('a')
        navigate(`./new`)
    }


    useEffect(() => {
        const idSetTimeout = setTimeout(() => {
                    console.log('search data: ', search)
                    console.log('Filter', filter)
                    
                    const filterData = getBookFilter(filter)
                    console.log('getBookFilter: ', filterData)

                    getBooks({ name: search, ...filterData})
                    clearTimeout(idSetTimeout)
                }, 500)
        
                return () => {
                    if (idSetTimeout) clearTimeout(idSetTimeout)
                }
    },[search, filter])

    const handleFilter = (data)=>{
        console.log('handleFilter data:',data)
        setFilter({...data})
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
                search={search}
                setSearch={setSearch}
                handleFilter={() => setOpenFilter(true)}
                updateSearch={setSearch}
                handleAdd={() => gotoCreatePage()}
                isFilter={!shallowEqual(filter, defaultFilter)}
            />
            <MainTable
                categoriesList={booksList}
                headCells={headCells}
                isLoading={isLoading}
                length={booksList?.length}
                page={page}
                handleChangePage={handleChangePage}
                setPage={setPage}
                orderBy={orderBy}
                order={order}
                handleRequestSort={handleRequestSort}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            >
                {booksList
                    ?.slice()
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`

                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.idBook}>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                    align="center"
                                >
                                    {row.idBook}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => gotoUpdatePage(row.idBook)}
                                    >
                                        <CreateOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="center">{row.author}</TableCell>
                                <TableCell align="center">{row.numberRemaining}</TableCell>
                                <TableCell align="center">{row.nameCategory}</TableCell>
                                

                            </TableRow>
                        )
                    })}
            </MainTable>


            {openNotice && (
                <Notification
                    {...message}
                    close={() => {
                        disableNotice()
                    }}
                />
            )}

            {openFilter && (
                <BookFilter currentFilter={filter} defaultFilter={defaultFilter} handleFilter={handleFilter} close={() => setOpenFilter(false)} />
            )}
        </Box>
    )
}
