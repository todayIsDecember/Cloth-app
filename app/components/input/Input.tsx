'use client'

import { InputProps } from "./InputProps";
import cn from 'classnames';
import styles from './Input.module.css'
import { ForwardedRef, forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Input = forwardRef(({className,typeBtn='text', createInput = false, value, inputValue, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  
  return (
      <input autoFocus={false} type={typeBtn} className={cn(className, styles.input, {[styles.createInput]: createInput})} placeholder={inputValue} required {...props} ref={ref} value={value} />
  )
})