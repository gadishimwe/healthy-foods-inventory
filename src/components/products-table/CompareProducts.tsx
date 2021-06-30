import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import { Product } from '@/api/types'
import CompareProductTableCell from './CompareProductTableCell'

interface CompareProductsProps {
  selectedProducts: Product[]
}

const CompareProducts: React.FC<CompareProductsProps> = ({ selectedProducts }) => {
  const firstProductTags: string[] = selectedProducts[0].tags ? selectedProducts[0].tags : []
  const secondProductTags: string[] = selectedProducts[1].tags ? selectedProducts[1].tags : []
  const tags: string[] = [...firstProductTags, ...secondProductTags]
  const uniqueTags = tags.filter((tag, index, self) => index === self.indexOf(tag))

  return (
    <TableRow>
      <TableCell align="center">{`${selectedProducts[0].name} vs ${selectedProducts[1].name}`}</TableCell>
      <TableCell align="center">
        {uniqueTags.length !== 0
          ? uniqueTags.map((tag, index) => (
              <span key={tag}>{`${tag}${index + 1 < uniqueTags.length ? ', ' : ''}`}</span>
            ))
          : '-'}
      </TableCell>
      <CompareProductTableCell selectedProducts={selectedProducts} selectedProductProperty="energy" />
      <CompareProductTableCell selectedProducts={selectedProducts} selectedProductProperty="protein" />
      <CompareProductTableCell selectedProducts={selectedProducts} selectedProductProperty="saturatedFat" />
      <CompareProductTableCell selectedProducts={selectedProducts} selectedProductProperty="carbohydrate" />
      <CompareProductTableCell selectedProducts={selectedProducts} selectedProductProperty="sugars" />
      <CompareProductTableCell selectedProducts={selectedProducts} selectedProductProperty="dietaryFibre" />
      <CompareProductTableCell selectedProducts={selectedProducts} selectedProductProperty="sodium" />
    </TableRow>
  )
}

export default CompareProducts
