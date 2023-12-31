import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
//import { ShoppingCartTwoTone } from '@mui/icons-material';
//import { Badge } from '@mui/material';
import { useContext, useEffect,useState } from 'react';
import { MyContext } from '../../MyContext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


//export default function CustomPaginationActionsTable() {
const CustomPaginationActionsTable = ()=> {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {allProducts} = useContext(MyContext);
  const { setProductIdToDelete } = useContext(MyContext);
  const { setProductIdToEdit } = useContext(MyContext);
  //const [rerender, setRerender] = useState(false);
  const [allProductsLocal,setAllProductsLocal] = useState([...allProducts]);
   useEffect(()=>{
       setAllProductsLocal([...allProducts]);
   }, [allProducts]);



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allProducts.length) : 0;

  const handleChangePage = (event, newPage) => {
    setAllProductsLocal([...allProducts]);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editProd = (id) => {
    setProductIdToEdit(id);
    setAllProductsLocal([...allProducts]);
}
  const deleteProd = (id) => {
    setProductIdToDelete(id);
  }
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? allProductsLocal.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : allProductsLocal
            ).map((product) => (
              <TableRow key={product._id}>
                <TableCell style={{ width: 40 }} align="right">
                  <IconButton title='Edit product' onClick={()=>{editProd(product._id)}}>
                      <ModeEditIcon color="primary" aria-label="shopping cart"/>
                  </IconButton>
                </TableCell>
                <TableCell style={{ width: 40 }} align="right">
                  <IconButton title='Delete product' onClick={()=>{deleteProd(product._id)}}>
                      <DeleteSweepIcon color="primary" aria-label="shopping cart"/>
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {product.title}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
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

export default CustomPaginationActionsTable;