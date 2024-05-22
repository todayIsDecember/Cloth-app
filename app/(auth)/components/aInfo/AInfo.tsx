'use client'

import { AInfoProps } from "./AInfoProps";
import cn from 'classnames'
import styles from './AInfo.module.css'
import { Alert, Button, H, Textarea } from "../../../components";
import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { IProduct } from "../../../../interfaces/product.interface";
import { API } from "../../../../helpers/api";
import AddIcon from '../../../../public/add.svg'

export const AInfo = ({product, className, ...props}: AInfoProps):JSX.Element => {
  const [discontinued, setDiscontinued] = useState(product.discontinued)
  const {register, handleSubmit, control, setValue} = useForm<Pick<IProduct, 'name' | 'description' | 'color' | 'discontinued' | 'price' | 'value'>>(
    {
      defaultValues: {
          name: product.name,
          description: product.description,
          color: product.color,
          discontinued: product.discontinued,
          price: product.price,
          value: product.value || [] // Assuming product.value is the array of arrays
      }
    }
  )
  const [isError, setIsError] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const {fields, append, remove, update} = useFieldArray({
    control,
    name: 'value'
  })

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
        "price": Number(data.price),
        "value": data.value
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
          <H tag="h3">Властивості:</H>
          <div className={styles.valueList}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.value}>
                <Controller
                  name={`value.${index}.0`}
                  control={control}
                  render={({ field }) => <textarea {...field} placeholder="назва" className={styles.textarea}/>}
                />
                <Controller
                  name={`value.${index}.1`}
                  control={control}
                  render={({ field }) => <textarea {...field} placeholder="Значення"  className={styles.textarea}/>}
                />
                <Button appearance="black" size="l" className={styles.button} onClick={() => remove(index)}>Видалити</Button>
              </div>
            ))}
            <AddIcon onClick={() => append([''])}/>
          </div>
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