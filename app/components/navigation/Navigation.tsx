'use client'

import { NavigationProps } from "./NavigationProps";
import cn from 'classnames';
import styles from './Navigation.module.css';
import { Button } from "../button/Button";
import { useState } from "react";

export const Navigation = ({className, selectedValue, ...props}: NavigationProps): JSX.Element => {
    const [selectedValueNative , setSelectedValueNative] = useState('all')
    return (
        <div className={cn(className, styles.nav)} {...props}>
            <Button appearance="black" size="m" className={cn( styles.button,{[styles.active]: selectedValueNative == 'all'})} onClick={() => {selectedValue('all'); setSelectedValueNative('all')}}>Всі товари</Button>
            <Button appearance="black" size="m" className={cn( styles.button,{[styles.active]: selectedValueNative == 'штори'})} onClick={() => {selectedValue('штори'); setSelectedValueNative('штори')}}>Штори</Button>
            <Button appearance="black" size="m" className={cn( styles.button,{[styles.active]: selectedValueNative == 'тюлі'})} onClick={() => {selectedValue('тюлі'); setSelectedValueNative('тюлі')}}>Тюлі</Button>
        </div>
    )
}