import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from '@mui/material'

import TableSkeleton from '~/components/Skeleton/TableSkeleton'
import { EnhancedTableHead } from '~/features/Category/components/EnhancedTableHead'


export default function MainTable(props) {

    const { 
        headCells,
        isLoading, 
        children, 
        length,
        order,
        orderBy,
        rowsPerPage,
        handleRequestSort,
        handleChangeRowsPerPage,
        handleChangePage,
        page,
    } = props
    
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - length) : 0

    return (
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
                        <TableSkeleton columns={headCells.length} />
                    ) : (
                        <TableBody>
                            {children}
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
                    count={length||0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    )
}
