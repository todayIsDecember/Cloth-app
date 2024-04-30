import { BackdropProps } from "./BackdropProps";
import cn from 'classnames';
import styles from './Backdrop.module.css'

export const BackDrop = ({onClick, className, ...props}: BackdropProps): JSX.Element => {
    return (
        <div className={cn(className, styles.backdrop)} {...props} onClick={onClick}></div>
    )
}