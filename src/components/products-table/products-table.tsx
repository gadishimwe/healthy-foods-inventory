import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'
import TableToolbar from './TableToolBar'
import { ProductsTableProps } from '../types'
import CompareProducts from './CompareProducts'
import { Product } from '@/api/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    tableContainer: {
      height: 428
    },
    head: {
      backgroundColor: theme.palette.background.default
    }
  })
)

const ProductsTable: React.FC<ProductsTableProps> = ({ products, productProperties }) => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selected, setSelected] = useState<number[]>([])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSelectClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage)
  const isSelected = (id: number) => selected.indexOf(id) !== -1
  const selectedProducts: Product[] = products.filter((product) => isSelected(product.id))

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar numSelected={selected.length} />
        <TableContainer className={classes.tableContainer}>
          <Table aria-label="table">
            <TableHead className={classes.head}>
              <TableRow>
                {productProperties.map((productProperty) => (
                  <TableCell key={productProperty.name} align="center">
                    {productProperty.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProducts.length === 2 && <CompareProducts selectedProducts={selectedProducts} />}
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <TableRow
                  key={product.id}
                  hover
                  onClick={(event) => handleSelectClick(event, product.id)}
                  selected={isSelected(product.id)}
                >
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">
                    {product.tags
                      ? product.tags.map((tag, index) => (
                          <span key={tag}>{`${tag}${index + 1 < product.tags.length ? ', ' : ''}`}</span>
                        ))
                      : '-'}
                  </TableCell>
                  <TableCell align="center">{product.energy ? product.energy : '-'}</TableCell>
                  <TableCell align="center">{product.protein ? product.protein : '-'}</TableCell>
                  <TableCell align="center">{product.saturatedFat ? product.saturatedFat : '-'}</TableCell>
                  <TableCell align="center">{product.carbohydrate ? product.carbohydrate : ''}</TableCell>
                  <TableCell align="center">{product.sugars ? product.sugars : '-'}</TableCell>
                  <TableCell align="center">{product.dietaryFibre ? product.dietaryFibre : '-'}</TableCell>
                  <TableCell align="center">{product.sodium ? product.sodium : '-'}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default ProductsTable
