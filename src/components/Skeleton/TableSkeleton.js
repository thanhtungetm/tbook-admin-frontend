import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material'

function TableSkeleton({ rows = 5, columns = 5 }) {
    return (
        <TableBody>
            {Array.from(new Array(rows)).map((row, index) => (
                <TableRow key={index} hover role="checkbox" >
                    {Array.from(new Array(columns)).map((col, indx) => (
                        <TableCell key={indx} align="center">
                            <Skeleton />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    )
}

export default TableSkeleton
