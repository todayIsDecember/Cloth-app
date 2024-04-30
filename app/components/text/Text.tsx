import { TextProps } from "./TextProps";
import cn from 'classnames';
import styles from './Text.module.css'

export const Text = ({children, className, ...props}: TextProps): JSX.Element => {
    return (
        <p className={cn(className, styles.text)} {...props}>{children}</p>
    )
}