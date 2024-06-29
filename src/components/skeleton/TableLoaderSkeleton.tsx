import {Skeleton, styled, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";

const StyledTable = styled(Table)(({ theme }) => ({
    minWidth: 750,
    border: `1px solid #000`,
    borderBottom: 'none',
    '& .MuiTableRow-root': {
        '& .MuiTableCell-root': { borderBottom: `1px solid #000` },
    },
}));

const TableSkeletonColumn = ({ ...rest }) => {
    return (
        <TableCell {...rest}>
            <Skeleton variant='text' style={{ width: '100px', height: '20px' }} />
        </TableCell>
    );
};

const TableLoaderSkeleton = ({ columns = 6, numberOfRows = 10 }) => {
    return (
        <TableContainer>
            <StyledTable>
                <TableBody>
                    {Array.from({ length: numberOfRows }).map((rowNum, i) => (
                        <TableRow key={i}>
                            {Array.from({ length: columns }).map((column, index) => (
                                <TableSkeletonColumn key={index} />
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </TableContainer>
    );
};

export default TableLoaderSkeleton;