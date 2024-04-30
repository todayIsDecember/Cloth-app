'use client'

import { Alert, Button, H, Input, Text } from "../../../components";
import { APricesProps } from "./APricesProps";
import cn from 'classnames'
import styles from './APrices.module.css'
import { useForm } from "react-hook-form";
import { IPrices } from "../../../../interfaces/prices.interface";
import { API } from "../../../../helpers/api";
import { useState } from "react";

export const APrices = ({price, className, ...props}: APricesProps): JSX.Element => {
    const {register, handleSubmit} = useForm<Pick<IPrices,'price'>>()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)
    const onSubmit = async (data) => {
        const response = await fetch(`${API.prices.edit}/${price.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "price": Number(data.price)
            })
        }).then(res => res.json()
        )
        if(response.message) 
        {
            setError(response.message)
            setTimeout(() => setError(''), 2000)
            return
        }
        setSuccess(true)
    }
    return (
        <>
            <form className={styles.container} {...props} onSubmit={handleSubmit(onSubmit)}>
                <H tag="h3">{price.type}</H>
                <Input className={className} inputValue={String(price.price)}  {...register('price')}/>
                <Button appearance="black" size="m">Змінити</Button>
            </form>
            {error && <Alert appearance="error">{error}</Alert>}
            {success && <Alert appearance="success">ціну на {price.type} успішно змінено</Alert>}
        </>
    )
}