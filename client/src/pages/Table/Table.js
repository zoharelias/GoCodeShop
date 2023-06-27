import * as React from 'react';
import { useContext, useEffect,useState } from 'react';
import { MyContext } from '../../MyContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const {allProducts} = React.useContext(MyContext);
    console.log('allProducts',allProducts);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allProducts.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    
    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="left">EDIT</TableCell>
            <TableCell align="left">DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts.map((product) => (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{product.title}</TableCell>
              <TableCell align="left">{product.description}</TableCell>
              <TableCell align="left">{product.price}</TableCell>
              <TableCell align="left">{product.category}</TableCell>
              <TableCell align="left">{product.image}</TableCell>
              <TableCell align="left">{<button onClick={console.log('edit')}>EDIT</button>}</TableCell>
              <TableCell align="left">{<button onClick={console.log('delete')}>DELETE</button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={allProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
     </Table>
    </TableContainer>
  );
}