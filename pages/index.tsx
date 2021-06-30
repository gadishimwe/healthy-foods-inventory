import React from 'react'
import Head from 'next/head'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ProductsTable } from '@/components'
import styles from '@/styles/Home.module.css'
import { getProductProperties, getProducts } from '@/api/products'
import { Product, ProductPropertyEntryDTO } from '@/api/types'

export async function getStaticProps(): Promise<{ props }> {
  const products: Product[] = await getProducts()
  const productProperties: ProductPropertyEntryDTO[] = await getProductProperties()

  return {
    props: {
      products,
      productProperties
    }
  }
}

interface HomeProps {
  products: Product[]
  productProperties: ProductPropertyEntryDTO[]
}

const Home: React.FC<HomeProps> = (props) => {
  const { products, productProperties } = props

  const theme = createMuiTheme({ palette: { type: 'dark' } })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <Head>
          <title>Healthy Foods</title>
          <meta name="description" content="Healthy Foods Challenge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Healthy Foods</h1>
          <p className={styles.description}>
            A comphrehensive inventory of all the <code>Healthy Foods</code> in our store
          </p>
          <ProductsTable products={products} productProperties={productProperties} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Home
