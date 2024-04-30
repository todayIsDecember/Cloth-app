'use client'

import cn from 'classnames';
import styles from './Product.module.css'
import { useState } from "react";
import Image from 'next/image'
import { API } from "../../../../helpers/api";
import { H, Text } from "../../../components";
import { ProductProps } from './ProductProps';

export const Product = ({product, isActive = false, className, ...props}: ProductProps): JSX.Element => {
  return (
    <div className={cn(className, styles.product, {[styles.active]: isActive, [styles.inActive]: product.discontinued})} {...props}>
      <Image src={`${API.image.get}/${Array.isArray(product.photo) ? product.photo[0] : product.photo}`} width={150} height={150} alt="image" />
      <div className={styles.info}>
        <H tag='h3' className={styles.title}>{product.name}</H>
        <hr/>
        <Text>{product.price} грн</Text>
      </div>
    </div>
  )
}