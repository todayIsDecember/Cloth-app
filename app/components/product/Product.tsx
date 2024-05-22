'use client'

import { ProductProps } from "./ProductProps";
import cn from 'classnames';
import styles from './Product.module.css'
import { H, Button, Text, BackDrop, MyImage, Alert, Tag } from "..";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import DeleteIcon from '../../../public/delete.svg'
import ByIcon from '../../../public/buy.svg'
import ArrowIcon from '../../../public/arrow.svg'
import { motion } from 'framer-motion'

// eslint-disable-next-line react/display-name
export const Product = forwardRef(({className, product, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const [addToBasket, setAddToBasket] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [isVisibleDescription, setIsVisibleDescription] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 700) {
                setIsVisibleDescription(false)
                return
            }
            setIsVisibleDescription(true)
        }

        handleResize()

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const variants = {
        hidden: {
            opacity: 0,
            height: 0,
        },
        visible: {
            opacity: 1,
            height: 'auto',
        }
    }
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
            <div className={cn(className, styles.product)} {...props} ref={ref}>
                <MyImage description={product.description} images={product.photo} className={styles.image}></MyImage>
                <H tag="h2" className={styles.title}>{product.name}</H>
                {isVisibleDescription && <Text size="l" className={styles.description}>{product.description}</Text>}
                <Button className={styles.btn} appearance="black" size="m" onClick={() => setOpen(open => !open)}>{'читати більше'} <ArrowIcon className={cn(styles.arrow, {[styles.open]: open})}/></Button>
                <motion.div
                    className={cn(styles.infoContainer, {[styles.InfoContainerOpen]: open})}
                    variants={variants}
                    animate={open ? 'visible' : 'hidden'}
                    initial="hidden"
                >
                        {!isVisibleDescription && <Text size="l">{product.description}</Text>}
                        {product.value &&product.value.map((item) =>  (
                            <>
                                <div className={styles.infoDetails}>
                                    <Tag className={styles.infoDetailsTitle} color="green" size="m">{item[0]}</Tag>
                                    <Text size="m">{item[1]}</Text>
                                </div>
                            </>
                        ))}
                        <div className={styles.infoDetails}>
                            <Tag className={styles.infoDetailsTitle}color="green" size="m">{'колір'}</Tag>
                            <Text size="s">{product.color}</Text>
                        </div>
                        <div className={styles.infoDetails}>
                            <Tag className={styles.infoDetailsTitle}color="green" size="m">{'матеріал'}</Tag>
                            <Text size="s">{product.type}</Text>
                        </div>
                </motion.div>
                <div className={styles.priceContainer}>
                    <div>{product.price}грн / м</div>
                    <div onClick={onClickButtonBasketHandler}>{addToBasket? <DeleteIcon className={styles.icon}/> : <ByIcon className={styles.icon}/>}</div>
                </div>
                {addToBasket && <Alert appearance="success" className={styles.alert}>Товар додано до кошика</Alert>}
            </div>
    )
})