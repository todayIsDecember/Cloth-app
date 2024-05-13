import { API } from '../../../../../helpers/api'
import { getAllPrices } from '../../../../API/getAllPrices'
import { getAllReviews } from '../../../../API/getAllReviews'
import { H } from '../../../../components'
import { APrices, AReviews, Products } from '../../../components'
import styles from './page.module.css'

export default async function Page ({params}: {params: {page: string}}) {
  const dictionary = {
    'productsPanel': 'Продукти',
    'reviewsPanel': 'Відгуки',
    'pricesPanel': 'Ціни',
  }

  if(params.page == 'productsPanel') 
    {
      const products = await fetch(API.products.getAllWithDiscontinued, {
        next: { revalidate: 1 },
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
}