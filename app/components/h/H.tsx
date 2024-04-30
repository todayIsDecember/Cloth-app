import { HProps } from "./HProps";
import cn from 'classnames';
import styles from './H.module.css'

export const H = ({tag, className, children, ...props}: HProps): JSX.Element => {
    return (
        <p className={cn(styles[tag], className, styles.h)} {...props}>{children}</p>
    )
}