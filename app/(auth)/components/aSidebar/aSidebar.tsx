'use client'

import { ASidebarProps } from "./aSidebarProps";
import styles from './aSidebar.module.css'
import cn from 'classnames'
import { useEffect, useState } from "react";
import Link from 'next/link'
import ProductIcon from '../../../../public/productAdmin.svg'
import PriceIcon from '../../../../public/priceAdmin.svg'
import ReviewIcon from '../../../../public/reviewAdmin.svg'
import ExitIcon from '../../../../public/exit.svg'

export const ASidebar = ({ className, ...props}: ASidebarProps): JSX.Element => {
    const [valueLink, setValueLink] = useState<string>('')

    const onExidHandler = () => {
        document.cookie = `token=`
    }

    return (
        <div className={cn(className, styles.sidebar)}>
            <ul className={styles.list}>
                <Link href={`/autorization/admin/productsPanel`} className={cn(styles.element, {[styles.active]: valueLink === 'Продукти'})} onClick={() => setValueLink('Продукти')}>
                    <ProductIcon/>
                </Link>
                <Link href={`/autorization/admin/reviewsPanel`} className={cn(styles.element, {[styles.active]: valueLink === 'Відгуки'})} onClick={() => setValueLink('Відгуки')}>
                    <ReviewIcon/>
                </Link>
                <Link href={`/autorization/admin/pricesPanel`} className={cn(styles.element, {[styles.active]: valueLink === 'Ціни'})} onClick={() => setValueLink('Ціни')}>
                    <PriceIcon/>
                </Link>
                <Link href={`/`} className={cn(styles.element)} onClick={() => onExidHandler()}>
                    <ExitIcon/>
                </Link>
            </ul>
        </div>
    )
}