import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { Product, ProductPropertyEntryDTO } from '@/api/types'
import CompareProductTableCell from './CompareProductTableCell'

interface CompareProductsProps {
  selectedProducts: Product[]
  productProperties: ProductPropertyEntryDTO[]
}

const CompareProducts: React.FC<CompareProductsProps> = ({ selectedProducts, productProperties }) => {
  const productPropertiesWithoutNameAndTags: ProductPropertyEntryDTO[] = [...productProperties]
  productPropertiesWithoutNameAndTags.splice(0, 2)

  return (
    <TableRow>
      <TableCell align="center">
        <div style={{ minHeight: 20 }} />
      </TableCell>
      <TableCell align="center"></TableCell>
      {productPropertiesWithoutNameAndTags.map((productProperty) => (
        <CompareProductTableCell
          key={productProperty.name}
          selectedProducts={selectedProducts}
          selectedProductProperty={productProperty.name}
        />
      ))}
    </TableRow>
  )
}

export default CompareProducts
