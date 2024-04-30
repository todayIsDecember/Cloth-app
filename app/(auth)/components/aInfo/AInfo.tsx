'use client'

import { AInfoProps } from "./AInfoProps";
import cn from 'classnames'
import styles from './AInfo.module.css'
import { Alert, Button, H } from "../../../components";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IProduct } from "../../../../interfaces/product.interface";
import { API } from "../../../../helpers/api";

export const AInfo = ({product, className, ...props}: AInfoProps):JSX.Element => {
  const [discontinued, setDiscontinued] = useState(product.discontinued)
  const {register, handleSubmit, control} = useForm<Pick<IProduct, 'name' | 'description' | 'color' | 'discontinued' | 'price'>>()
  const [isError, setIsError] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onSubmit = async (data) => {
    await fetch(`${API.products.edit}/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": data.name,
        "description": data.description,
        "color": data.color,
        "discontinued": data.discontinued,
        "price": Number(data.price)
      })
    }).then(res => res.json()
    ).then(data => {
      if(data.message) {
        setIsError(data.message)
        setTimeout(() => setIsError(''), 2000)
        return
      }
      setDiscontinued(data.discontinued)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 2000)
    })
  }

  return (
    <form className={cn(className, styles.wrapper)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <H tag="h1">Інформація</H>
      <div className={styles.conteiner}>
        <div className={styles.subConteiner}>
          <H tag="h3">Назва:</H>
          <textarea className={styles.textarea} defaultValue={product.name} {...register('name')}></textarea>
        </div>
        <div className={styles.subConteiner}>
          <H tag="h3">Опис:</H>
          <textarea className={styles.textarea} defaultValue={product.description} {...register('description')}></textarea>
        </div>
        <div className={styles.subConteiner}>
          <H tag="h3">Колір:</H>
          <textarea className={styles.textarea} defaultValue={product.color} {...register('color')}></textarea>
        </div>
        <div className={styles.subConteiner}>
          <H tag="h3">Ціна:</H>
          <textarea className={styles.textarea} defaultValue={product.price} {...register('price')}></textarea>
        </div>
        <div className={styles.subConteiner}>
          <H tag="h3">відключити:</H>
          <Controller
          control={control}
          name="discontinued"
          render={({ field }) => (
            <label className={cn(styles.switch, styles.switchStatus)}>
            <input type="checkbox" checked={discontinued} onChange={() => {setDiscontinued(!discontinued); field.onChange(!discontinued)}}/>
            <span className={styles.slider}></span>
        </label>
          )}
        />
        </div>
        {isError && <Alert appearance="error">{isError}</Alert>}
        {isSuccess && <Alert appearance="success">Успішно збережено</Alert>}
        <Button appearance="black" size="l" className={styles.button}>Зберегти</Button>
      </div>
    </form>
  )
}