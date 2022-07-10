import PropTypes from 'prop-types'
import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material"

export function EnhancedTableHead(props) {
    const { headCells, order, orderBy, onRequestSort } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align? headCell.align : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={ orderBy === headCell.id ? order :false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={headCell.noneSort ? undefined : createSortHandler(headCell.id)}
                            hideSortIcon={headCell.noneSort}
                        >
                            {headCell.label}
                            {/* {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null} */}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
}