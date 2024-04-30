import { ButtonProps } from "./ButtonProps";
import cn from 'classnames';
import styles from './Butoon.module.css'

export const Button = ({children, appearance, size, isActive = false, className, ...props}: ButtonProps): JSX.Element => {
    return (
        <button {...props} className={cn(className, styles.button, {
            [styles.m] : size === 'm',
            [styles.l]: size === 'l',
            [styles.white]: appearance === 'white',
            [styles.black]: appearance === 'black',
            [styles.transparent]: appearance === 'transparent',
            [styles.active]: isActive
        })}>{children}</button>
    )
}