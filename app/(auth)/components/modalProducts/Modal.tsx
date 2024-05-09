'use client'

import { ModalProps } from "./ModalProps";
import cn from 'classnames'
import styles from './Modal.module.css'
import { Button } from "../../../components";
import Link from 'next/link'
import { API } from "../../../../helpers/api";
import DeleteIcon from '../../../../public/delete.svg'
import EditIcon from '../../../../public/edit.svg'

export const Modal = ({variants, id_el, isActive = false, sendStatus, className, ...props}: ModalProps): JSX.Element => {
  switch(variants) {
    case 'product':
      return (
        <div className={cn(className, styles.modal, {[styles.open]: isActive})} {...props}>
          <Link href={`/autorization/admin/productsPanel/product_${id_el}`}><EditIcon/></Link>
        </div>
      )
    case 'reviews':
      return (
        <div className={cn(className, styles.modal, {[styles.open]: isActive})} {...props}>
          <div onClick={() => sendStatus? sendStatus(true): null}><DeleteIcon/></div>
        </div>
      )
    case 'price':
      return (
        <div className={cn(className, styles.modal, {[styles.open]: isActive})} {...props}></div>
      )
  }
}