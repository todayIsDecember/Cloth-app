'use client'

import { useEffect, useState } from "react"
import { Navigation, Product } from "../../components"
import styles from './page.module.css'
import { IProduct } from "../../../interfaces/product.interface"
import { getAllProducts } from "../../API/getAllProducts"
import { getProductsByCategory } from "../../API/getProductsByCategory"

export default function Catalog ():JSX.Element {
    const [products, setProducts] = useState<IProduct[]>([])
    const [navValue, setNavValue] = useState<string>('all')

    useEffect(() => {
        if(navValue === 'all') {
            const getAllProd = async () => {
                const data = await getAllProducts()
                if(!data) {
                    return
                }
                setProducts(data)
                return
            }


        getAllProd()
        return
        }
        const getProductsByCategoryFn = async () => {
            const data = await getProductsByCategory(navValue)
            if(!data) {
                return
            }
            setProducts(data)
            return
        }
        getProductsByCategoryFn()

}, [navValue])

    return (
        <div className={styles.catalog}>
            <Navigation selectedValue={(value) => setNavValue(value)} className={styles.nav}/>
            {products.map(product => <Product key={product.id} product={product} />)}
        </div>
    )
}