'use client'

import { NavigationProps } from "./NavigationProps";
import cn from 'classnames';
import styles from './Navigation.module.css';
import { Button } from "../button/Button";

export const Navigation = ({className, selectedValue, ...props}: NavigationProps): JSX.Element => {
    return (
        <div className={cn(className, styles.nav)} {...props}>
            <Button appearance="black" size="m" onClick={() => selectedValue('all')}>Всі товари</Button>
            <Button appearance="black" size="m" onClick={() => selectedValue('штори')}>Штори</Button>
            <Button appearance="black" size="m" onClick={() => selectedValue('тюлі')}>Тюлі</Button>
        </div>
    )
}