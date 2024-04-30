import cn from 'classnames';
import styles from './Link.module.css';
import {LinkProps} from './Link.props';

export const LinkCustom = ({className, children, isActive = false, ...props}: LinkProps) => {
    return (
        <div className={cn(styles.link, className, {
            [styles.active]: isActive
        })} {...props}>
            {children}
        </div>
    );
};