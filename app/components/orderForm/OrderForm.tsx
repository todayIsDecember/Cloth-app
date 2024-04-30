'use client'

import { OrderFormProps } from "./OrderFormProps";
import cn from 'classnames';
import styles from './OrderForm.module.css';
import { useForm, Controller } from 'react-hook-form'
import { IOrderForm } from "../../../interfaces/orderForm.interface";
import { Alert, AutoComplit, Button, H, Input, Textarea } from "..";
import { useEffect, useState } from "react";
import { getAddresses } from "../../API/getAddresses";
import { createOrder } from "../../API/createOrder";


export const OrderForm = ({className, products, ...props}: OrderFormProps): JSX.Element => {
  const [isDelivery, setIsDelivery] = useState<boolean>(false)
  const {register, handleSubmit, reset, control} = useForm<IOrderForm>()
  const [city, setCity] = useState<string>('')
  const [delivery, setDelivery] = useState<string>('')
  const [fullPrice, setFullPrice] = useState<number>(0)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const price = products.reduce((acc, product) => {
      return acc + product.price
    }, 0)
    setFullPrice(price)
    
  }, [products])

  const onSubmit = async (data) => {
    data.full_price = Number(fullPrice)
    data.department = delivery
    data.city = city
    data.products = products
    data.usedelivery = isDelivery
    data.price = fullPrice
    let cookie = document.cookie.split(';').find(c => c.trim().startsWith('product='))?.split('=')[1]
    if(!cookie || JSON.parse(cookie).length === 0) {
      setError('товарів не знайдено')
      return;
    }
    
    try {
      const response = await createOrder(data)
      if(response.success) {
        reset()
        setIsDelivery(false)
        setCity('')
        setDelivery('')
        setFullPrice(0)
        setSuccess(true)
        document.cookie = `product=[]`
        console.log(cookie.length);
        
        setTimeout(() => {
          document.location.reload()
        }, 1000)
      }
      else {
        setError(response.message)
      }
    } catch (error: Error | any) {
      setError(error.message)
    }
    
  }
  return (
    <form className={cn(className, styles.orderForm)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.subForm, styles.contactForm)}>
        <H className={styles.title} tag="h3">Контактна інформація</H>
        <Input inputValue="ваше прізвище та ім'я" {...register('customer_name')} typeBtn="text"/ >
        <Input inputValue="ваш телефон" typeBtn="tel" {...register('phone')}/>
      </div>
      <div className={cn(styles.subForm, styles.deliveryForm)}>
        <H tag="h3" className={styles.title}>Доставка новою поштою</H>
        <Controller
          control={control}
          name="usedelivery"
          render={({ field }) => (
            <label className={cn(styles.switch, styles.switchStatus)}>
            <input type="checkbox" checked={isDelivery} onChange={() => {setIsDelivery(!isDelivery); field.onChange(!isDelivery)}}/>
            <span className={styles.slider}></span>
        </label>
          )}
        />
        {isDelivery &&
          <div className={styles.delivery}>
            <AutoComplit type="населений пункт" getResponse={getAddresses} onSave={(value) => setCity(value)}></AutoComplit>
            <AutoComplit type='відділення' getResponse={getAddresses} city={city} onSave={(value) => setDelivery(value)}></AutoComplit>
          </div>
        }
      </div>
      <div className={cn(styles.subForm, styles.comment)}>
        <H tag="h3" className={styles.title}>коментар до замовлення</H>
        <Textarea value="коментар" {...register('comment')} />
      </div>
      <H tag="h3" className={styles.fullPrice}>Загальна ціна: {fullPrice} грн</H>
      <Button appearance="black" size="l" className={styles.button}>Замовити</Button>
      {success && <Alert appearance="success">Ваше замовлення прийняте</Alert>}
      {error && <Alert appearance="error">{error}</Alert>}
    </form>
  )
}