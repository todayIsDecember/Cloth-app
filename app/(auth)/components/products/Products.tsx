'use client'

import { ProductsProps } from "./ProductsProps";
import cn from 'classnames'
import styles from './Products.module.css'
import Link from 'next/link'
import { useState } from "react";
import { Button, H } from "../../../components";
import { Modal, Product } from '../../components'

export const Products = ({products, className, ...props}: ProductsProps): JSX.Element => {
  const [selectedProduct, setSelectedProduct] = useState<number>(0)

  const onClickProductHandler = (id: number) => {
    if(selectedProduct === id) {
      setSelectedProduct(0)
      return
    }
    setSelectedProduct(id)
  }

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
        <Link href={'./productsPanel/create_product'}><Button appearance="black" size="l" className={styles.create}>Створити новий продукт</Button></Link>
        <div className={styles.productsContainer}>
          {products.map((product) => (
            <Product key={product.id} product={product} className={styles.product} onClick={() => onClickProductHandler(product.id)} isActive={selectedProduct === product.id}></Product>
          ))}
        </div>
        <Modal variants="product" id_el={selectedProduct} isActive={selectedProduct !== 0}></Modal>
    </div>
  )

}