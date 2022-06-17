import { IconButton } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import SettingsIcon from '@material-ui/icons/Settings'
import { useState } from 'react'

import EnhancedTableHead from '~/components/Admin/GridData/EnhancedTableHead'
import EnhancedTableToolbar from '~/components/Admin/GridData/EnhancedTableToolbar'
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
    createData('Oreo', 437, 18.0),
]

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID',
    },
    { id: 'nameCategory', numeric: true, disablePadding: false, label: 'Tên' },
    {
        id: 'idParent',
        numeric: true,
        disablePadding: false,
        label: 'ID Parent',
    },
    {
        id: 'update',
        numeric: true,
        disablePadding: false,
        label: 'Cập nhật',
        sortIcon: true,
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
}))

function Category() {
    const classes = useStyles()
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('id')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [dense, setDense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.name)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleChangeDense = (event) => {
        setDense(event.target.checked)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
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
                                    const isItemSelected = isSelected(row.id)
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, row.id)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            {/* Check */}
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby':
                                                            labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            {/* Column */}
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.nameCategory}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.idParent}
                                            </TableCell>
                                            <TableCell align="right">
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
                                        height: (dense ? 33 : 53) * emptyRows,
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
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </div>
    )
}

export default Category
