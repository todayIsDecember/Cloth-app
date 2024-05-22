import { TagProps } from "./TagProps";
import cn from 'classnames';
import styles from './Tag.module.css'

export const Tag = ({children, color, size, className, ...props}: TagProps) => {
  return (
    <div className={cn(className, styles.tag, styles[color], styles[size])}  {...props}>{children}</div>
  )
}