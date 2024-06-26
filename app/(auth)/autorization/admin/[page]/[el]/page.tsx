import { API } from "../../../../../../helpers/api";
import { IProduct } from "../../../../../../interfaces/product.interface";
import { getProductById } from "../../../../../API/getProductById";
import { H } from "../../../../../components";
import { AInfo, APhotos, CreateProductForm } from "../../../../components";
import styles from './page.module.css'

export default async function Page ({params}: {params: {page: string, el: string}}) {
  const [name, id] = params.el.split('_')
  if(name === 'product') {
    const product: IProduct = await getProductById(id)
    return (
      <div className={styles.wrapper}>
        <H tag='h1'>{product.name}</H>
        <APhotos images={product.photo} product_id={Number(id)}></APhotos>
        <AInfo product={product}></AInfo>
      </div>
    )
  }
  else if(name === 'create') {
    return (
      <div className={styles.wrapper}>
        <CreateProductForm></CreateProductForm>
      </div>
    )
  }
}