'use client'
import { ProductFormProps } from "./ProductFormProps";
import cn from 'classnames';
import styles from './ProductForm.module.css'
import { IProductForm } from "../../../interfaces/productForm.interface";
import Image from 'next/image'
import { H } from "../h/H";
import { API } from "../../../helpers/api";
import { useEffect, useState } from "react";
import { getColors } from "../../API/getColors";
import { DropBox } from "../dropBox/DropBox";
import { Text } from "../text/Text";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Alert } from "../alert/Alert";
import { getAllPrices } from "../../API/getAllPrices";
import { getProductByColor } from "../../API/getProductByColor";
import { MyImage } from "../MyImage/MyImage";

export const ProductForm = ({className,handleOnChange,  product, ...props}: ProductFormProps): JSX.Element => {
  const [colors, setColors] = useState([])
  const [color, setColor] = useState(product.color)
  const [width, setWidth] = useState(product.width)
  const [height, setHeight] = useState(product.height)
  const [isfinished, setIsfinished] = useState(false)
  const [price , setPrice] = useState<number>(product.price)
  const [addToBasket, setAddToBasket] = useState<boolean>(false)
  const [image, setImage] = useState(product.photo)




  useEffect(() => {
    const colors = async () => {
      const data = await getColors(product.type)
      
      
      setColors(data)
    }

    colors()
    
  }, [product.type]);

  useEffect(() => {
    const generatePrice = async () => {
      const prices = await getAllPrices()
      if(isfinished){
        const priceOnJob = prices.find((price) => price.type === product.category);
        const priceOnMaterials = prices.find((price) => price.type === 'стрічка');
        const price = Math.floor(width * (product.price + priceOnJob.price + priceOnMaterials.price))
        setPrice(Number(price))
      }
      else {
        const price = Math.floor(product.price * width)
        setPrice(Number(price))
      }
    }

    generatePrice()

    
  }, [width, isfinished])

  useEffect(() => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('product='));
    if(!cookie) { 
      return
    }
    else {
      const cookieArray = cookie.split('=')
      const cookieValue = JSON.parse(cookieArray[1])
      const cookieIndex = cookieValue.findIndex((cookie: number) => cookie === product.id)
      if(cookieIndex !== -1) {
        setAddToBasket(true)
        return;
      }
      else
      setAddToBasket(false)
    }
  }, [])

  const onClickButtonBasketHandler = () => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('product='))
    if(!cookie) {
      document.cookie = `product=${JSON.stringify([product.id])}`
      setAddToBasket(true)
      return
    }
    else {
      const cookieArray = cookie.split('=')
      const cookieValue = JSON.parse(cookieArray[1])
      const cookieIndex = cookieValue.findIndex((cookie: number) => cookie === product.id)
      if(cookieIndex !== -1) {
        cookieValue.splice(cookieIndex, 1);
        document.cookie = `product=${JSON.stringify(cookieValue)}`
        setAddToBasket(false)
        return;
      }
      else
      cookieValue.push(product.id);
      document.cookie = `product=${JSON.stringify(cookieValue)}`
      setAddToBasket(true)
    }
  }

  useEffect(() => {
    let data: IProductForm = {
      id  : product.id,
      price: price,
      height: height,
      width: width,
      color: color,
      isfinished: isfinished,
    }

    handleOnChange(data)
    
  }, [color, height, isfinished, price, width])

    useEffect(() => {
      const data = async () => {
        const selectedColor = await getProductByColor(color, product.type)
        
        if(selectedColor[0].id === product.id) {   
          setImage(product.photo)
          return
        }
        setImage(selectedColor[0].photo)
        
      }

      data()
    }, [color, product.type])



  return (
    <form className={cn(className, styles.form)} {...props}>
      <MyImage className={styles.image} images={image}></MyImage>
      <div className={styles.info}>
        <H tag="h3" className={styles.name}>{product.name}</H>
        <Text className={styles.colorTitle}>Колір</Text>
        <DropBox className={styles.color} elements={colors} value={product.color} onSave={(value: string) => setColor(value)}></DropBox>
        <Text className={styles.widthTitle}>Довжина</Text>
        <Input className={styles.width} defaultValue={product.width} inputValue="введіть довжину" onChange={(e:any) => setWidth(Number(e.target.value))}></Input>
        <Text className={styles.heightTitle}>Висота</Text>
        <Input className={styles.height} defaultValue={product.height} inputValue="введіть висоту" onChange={(e:any) => setHeight(Number(e.target.value))}></Input>
        {height < 2.3 && <Alert appearance="info" className={styles.infoAlert}>при висоті менше 2.3 метра доставка тільки після предоплати</Alert>}
        {height > 2.9 && <Alert appearance="error" className={styles.infoAlert}>максимальна висота 2.9 метра</Alert>}
        <Text className={styles.isReady}>готовий продукт?</Text>
        <label className={cn(styles.switch, styles.switchStatus)}>
            <input type="checkbox" checked={isfinished} onChange={() => {setIsfinished(!isfinished)}}/>
            <span className={styles.slider}></span>
        </label>
        {isfinished && <Alert appearance="info" className={styles.infoAlertIsFinished}>в ціну закладено матеріал + робота</Alert>}
        <Text className={styles.price}>ціна</Text>
        <Text className={styles.priceValue}>{ price }грн</Text>
        <Button appearance="black" size="m" className={styles.addToBasket} onClick={onClickButtonBasketHandler}>{addToBasket? 'Видалити з кошика' : 'Додати в кошик'}</Button>
      </div>
    </form>
  )
}