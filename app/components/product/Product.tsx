'use client'

import { ProductProps } from "./ProductProps";
import cn from 'classnames';
import styles from './Product.module.css'
import { H, Button, Text, BackDrop, MyImage, Alert } from "..";
import { useEffect, useState } from "react";
import DeleteIcon from '../../../public/delete.svg'
import ByIcon from '../../../public/buy.svg'

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
        <>
            <div className={cn(className, styles.product)} {...props}>
                <MyImage description={product.description} images={product.photo} className={styles.image}></MyImage>
                <div className={styles.info}>
                    <H tag="h2" className={styles.name}>{product.name}</H>
                    <Text className={styles.description}>{product.description}</Text>
                    <div className={styles.priceContainer}>
                        <div>{product.price}грн / м</div>
                        <div onClick={onClickButtonBasketHandler}>{addToBasket? <DeleteIcon className={styles.icon}/> : <ByIcon className={styles.icon}/>}</div>
                    </div>
                    {addToBasket && <Alert appearance="success" className={styles.alert}>Товар додано до кошика</Alert>}
                </div>
            </div>
        </>
    )
}