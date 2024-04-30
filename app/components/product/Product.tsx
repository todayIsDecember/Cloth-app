'use client'

import { ProductProps } from "./ProductProps";
import cn from 'classnames';
import styles from './Product.module.css'
import { H, Button, Text, BackDrop, MyImage } from "..";
import { useEffect, useState } from "react";

export const Product = ({className, product, ...props}: ProductProps): JSX.Element => {

    const [addToBasket, setAddToBasket] = useState<boolean>(false)
    const [mainPhoto, setMainPhoto] = useState<string>(product.photo[0])

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
    return (
        <div className={cn(className, styles.product)} {...props}>
            <MyImage images={product.photo} className={styles.image}></MyImage>
            <div className={styles.info}>
                <H tag="h2" className={styles.name}>{product.name}</H>
                <Text className={styles.description}>{product.description}</Text>
                <div className={styles.priceContainer}>
                    <div>{product.price}грн / м</div>
                    <Button appearance="black" size="m" onClick={onClickButtonBasketHandler}>{addToBasket? 'Видалити з кошика' : 'Додати в кошик'}</Button>
                </div>
            </div>
        </div>
    )
}