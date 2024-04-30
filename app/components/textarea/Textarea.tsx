import { TextareaProps } from "./TextareaProps";
import styles from './Textarea.module.css'
import cn from 'classnames'
import { ForwardedRef, forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef(({className, value, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <textarea className={cn(className, styles.textarea)} {...props} ref={ref} placeholder={value}/>
  )
})