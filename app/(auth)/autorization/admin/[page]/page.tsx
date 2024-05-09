import { API } from '../../../../../helpers/api'
import { getAllPrices } from '../../../../API/getAllPrices'
import { getAllProducts } from '../../../../API/getAllProducts'
import { getAllReviews } from '../../../../API/getAllReviews'
import { H, Review } from '../../../../components'
import { AOrders, APrices, AReviews, Products } from '../../../components'
import styles from './page.module.css'

export default async function Page ({params}: {params: {page: string}}) {
  const dictionary = {
    'productsPanel': 'Продукти',
    'reviewsPanel': 'Відгуки',
    'pricesPanel': 'Ціни',
    'ordersPanel': 'Замовлення'
  }

  if(params.page == 'productsPanel') 
    {
      const products = await fetch(API.products.getAllWithDiscontinued, {
        next: { revalidate: 10 },
      }).then(res => res.json())
      return (
        <div className={styles.wrapper}>
          <H tag='h1'>{dictionary['productsPanel']}</H>
          <Products products={products}></Products>
        </div>
      )
    }
  else if(params.page == 'reviewsPanel') 
    {
      const reviews = await getAllReviews()
      return (
        <div className={styles.wrapper}>
          <AReviews reviews={reviews}></AReviews>
        </div>
      )
    }
  else if(params.page == 'pricesPanel')
    {
      const prices = await getAllPrices()
      return (
        <div className={styles.wrapper}>
          {prices.map((price) => (
            <APrices key={price.id} price={price}></APrices>
          ))}
        </div>
      )
    }
  else if(params.page == 'ordersPanel')
    {
      const orders = await fetch(API.orders.getAll, {
        method: 'GET',
        next: { revalidate: 1000 },
      }).then(res => res.json())
      return (
        <div className={styles.wrapper}>
          <AOrders orders={orders}></AOrders>
        </div>
      )
    }
}