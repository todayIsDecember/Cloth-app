'use client'

import { ReviewFormProps } from "./ReviewFormProps";
import cn from 'classnames';
import styles from './ReviewForm.module.css'
import { H } from "../h/H";
import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";
import { Button } from "../button/Button";
import { Rating } from "../rating/Rating";
import {useForm, Controller} from 'react-hook-form'
import { IReview } from "../../../interfaces/review.interface";
import { API } from "../../../helpers/api";
import { useState } from "react";
import { Alert } from "../alert/Alert";

export const ReviewForm = ({className, ...props}: ReviewFormProps): JSX.Element => {
  const {register, handleSubmit, reset, control} = useForm<Pick<IReview, 'name' | 'raiting' | 'description'>>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const onSubmit = async (data) => {
    await fetch(API.reviews.addReview, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()
    ).then(data => {

      if(data) {
        setIsSuccess(true)
      } else {
        setError(data.message)
      }
    }
    )

    reset()

  }

  return (
    <form className={cn(className, styles.form)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <H tag="h3" className={styles.title}>Залиште відгук про нашу продукцію</H>
      <Input inputValue="Ваше ім'я" className={styles.name} {...register('name')}/>
      <Textarea value="ваш відгук" className={styles.review} {...register('description')}/>
      <Controller control={control} name="raiting" render={({field}) => <Rating raiting={field.value} setRating={field.onChange} isEditable/>}/>
      <Button appearance="black" size="m" className={styles.btn}>Надіслати</Button>
      {isSuccess && <Alert appearance="success" className={styles.alert}>Дякуємо за відгук, він буде доданий на сайт ближчим часом</Alert>}
      {error && <Alert appearance="success" className={styles.alert}>{error}</Alert>}
    </form>
  )
}