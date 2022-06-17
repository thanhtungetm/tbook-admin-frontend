import {
    Box,
    Button,
    FormControl,
    IconButton,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import SettingsIcon from '@material-ui/icons/Settings'
import { useState } from 'react'

import EnhancedTableHead from '~/components/Admin/GridData/EnhancedTableHead'
import stableSort from '~/utils/stableSort'

function createData(id, nameCategory, idParent) {
    return { id, nameCategory, idParent }
}
const data = [
    createData(1, 'A', 3.7),
    createData(2, 'B', 25.0),
    createData(3, 'C', 16.0),
    createData(4, 'D', 6.0),
    createData(5, 'E', 16.0),
    createData(6, 'F', 3.2),
    createData(7, 'G', 9.0),
    createData(8, 'H', 0.0),
    createData(9, 'I', 26.0),
    createData(10, 'K', 0.2),
    createData(11, 'L', 0),
    createData(12, 'M', 19.0),
]

const headCells = [
    {
        id: 'id',
        align: 'center',
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'nameCategory',
        align: 'center',
        disablePadding: false,
        label: 'Tên',
    },
    {
        id: 'idParent',
        align: 'right',
        disablePadding: false,
        label: 'ID Parent',
    },
    {
        id: 'update',
        align: 'center',
        disablePadding: false,
        label: 'Cập nhật',
        noneSort: true,
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        with: '100%',
        // position: 'relative',
    },
    tabelWrap: {
        width: '100%',
    },
    paper: {
        // position: 'relative',
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 100,
    },
}))

function Category() {
    const classes = useStyles()

    const [openAdd, setOpenAdd] = useState(false)

    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('id')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const handleOpenAdd = (event) => {
        setOpenAdd(true)
    }
    const handleCloseAdd = (event) => {
        setOpenAdd(false)
    }

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
        <div className={classes.root}>
            <Toolbar>
                <Typography style={{ flex: '1 1 100%' }} variant="h5">
                    Danh muc
                </Typography>
                <IconButton color="primary" onClick={handleOpenAdd}>
                    <Typography variant="button">Them moi</Typography>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Toolbar>

            <div className={classes.tableWrap}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={'small'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                headCells={headCells}
                                classes={classes}
                                // numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                // onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {stableSort(data, order, orderBy)
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                {/* Column */}
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="none"
                                                    align="center"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.nameCategory}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.idParent}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton color="primary">
                                                        <SettingsIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 61 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

            {openAdd && <AddCategoryModal closeAdd={handleCloseAdd} />}
        </div>
    )
}

function AddCategoryModal({ closeAdd }) {
    return (
        <Box
            style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#28282b6e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={4}
                style={{
                    minWidth: '500px',
                }}
            >
                {' '}
                <Toolbar>
                    <Typography variant="h5" style={{ flex: '1 1 100%' }}>
                        Them danh muc
                    </Typography>
                    <IconButton color="primary">
                        <HighlightOffIcon onClick={closeAdd} />
                    </IconButton>
                </Toolbar>
                <form noValidate autoComplete="off">
                    <FormControl fullWidth>
                        <TextField id="parent" label="Standard" />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField id="parent" label="Standard" />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField id="parent" label="Standard" />
                    </FormControl>
                    <Button color="primary">Primary</Button>
                </form>
            </Paper>
        </Box>
    )
}

export default Category
