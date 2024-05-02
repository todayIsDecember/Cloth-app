'use client'

import { AOrdersProps } from "./AOrdersProps"
import cn from 'classnames'
import styles from './AOrders.module.css'
import { AORder } from "../aOrder/AOrder"
import { H, Input } from "../../../components"
import { useEffect, useState } from "react"
import { IOrder } from "../../../../interfaces/order.interface"
import SearchIcon from './../../../../public/search.svg'
import { API } from "../../../../helpers/api"

export const AOrders = ({orders, className, ...props}: AOrdersProps): JSX.Element => {
    const [ordersArray, setOrdersArray] = useState<IOrder[]>(orders)
    const [value, setValue] = useState<number>(0)
    const [name, setName] = useState<string>('')

    useEffect(() => {
        const getById = async () => {
            if(value === 0 ||  isNaN(value))
                {
                   setOrdersArray(orders) 
                }
            else 
                {
                    const response = await fetch(`${API.orders.getById}/${value}`, {
                        next: { revalidate: 10 },
                    }).then(res => res.json())
                    setOrdersArray(response)
                }
        }

        getById()
    }, [value])

    useEffect(() => {
        const getByName = async () => {
            if(name === '')
                {
                   setOrdersArray(orders) 
                }
            else 
                {
                    const response = await fetch(`${API.orders.getByCusomerName}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({name: name}),
                        next: { revalidate: 10 },
                    }).then(res => res.json())
                    setOrdersArray(response)
                }
        }

        getByName()
    }, [name])
    return (
        <>
        <div className={styles.search}>
            <SearchIcon className={styles.searchIcon}/>
            <Input  inputValue="пошук замовлення по ідентифікатору" onChange={(e:any) => setValue(Number(e.target.value))}></Input>
        </div>
        <div className={styles.search}>
            <SearchIcon className={styles.searchIcon}/>
            <Input  inputValue="пошук замовлення по імені замовника" onChange={(e:any) => setName(e.target.value)}></Input>
        </div>
        <div className={cn(className, styles.orders, {[styles.noOrders]: orders.length === 0})} {...props}>
            {ordersArray.length > 0 ? ordersArray.map(order => <AORder key={order.id} order={order}></AORder>) : <H tag='h3'>Немає замовлень</H>}
        </div>
        </>
    )
}