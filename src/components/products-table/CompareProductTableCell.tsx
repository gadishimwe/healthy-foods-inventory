import React from 'react'
import { createStyles, makeStyles, TableCell, Badge } from '@material-ui/core'
import { Product } from '@/api/types'

const styles = makeStyles(() =>
  createStyles({
    badge: {
      minWidth: 20
    }
  })
)

interface CompareProductTableCellProps {
  selectedProducts: Product[]
  selectedProductProperty: string
}

const CompareProductTableCell: React.FC<CompareProductTableCellProps> = ({
  selectedProducts,
  selectedProductProperty
}) => {
  const classes = styles()

  return (
    <TableCell align="center">
      {selectedProducts[0][selectedProductProperty] !== selectedProducts[1][selectedProductProperty] ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge
            max={9999}
            className={classes.badge}
            badgeContent={
              <span style={{ textDecoration: 'line-through' }}>
                {selectedProducts[0][selectedProductProperty] ? selectedProducts[0][selectedProductProperty] : ' - '}
              </span>
            }
            color="secondary"
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          />
          <Badge
            max={9999}
            className={classes.badge}
            badgeContent={
              selectedProducts[1][selectedProductProperty] ? selectedProducts[1][selectedProductProperty] : ' - '
            }
            color="primary"
          />
        </div>
      ) : selectedProducts[0][selectedProductProperty] ? (
        selectedProducts[0][selectedProductProperty]
      ) : (
        '-'
      )}
    </TableCell>
  )
}

export default CompareProductTableCell
