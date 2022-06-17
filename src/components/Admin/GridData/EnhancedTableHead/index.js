import {
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core'
import PropTypes from 'prop-types'
export default function EnhancedTableHead(props) {
    const {
        headCells,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        check = false,
    } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {check && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                )}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        <TableSortLabel
                            hideSortIcon={headCell.noneSort}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={
                                headCell.noneSort
                                    ? null
                                    : createSortHandler(headCell.id)
                            }
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
}
