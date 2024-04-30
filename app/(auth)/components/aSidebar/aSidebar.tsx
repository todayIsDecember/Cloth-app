'use client'

import { ASidebarProps } from "./aSidebarProps";
import styles from './aSidebar.module.css'
import cn from 'classnames'
import { useEffect, useState } from "react";
import { Button } from "../../../components";
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const ASidebar = ({ className, ...props}: ASidebarProps): JSX.Element => {
    const [value, setValue] = useState<string>('')
    const links: string[] = ['Продукти', 'Відгуки', 'Ціни', 'Замовлення']
    const dictionary = {
        'Продукти': 'productsPanel',
        'Відгуки': 'reviewsPanel',
        'Ціни': 'pricesPanel',
        'Замовлення': 'ordersPanel'
    }
    const router = useRouter()

    const onExidHandler = () => {
        document.cookie = `token=`
        router.push('/')
    }

    return (
        <div className={cn(className, styles.sidebar)}>
            <ul className={styles.list}>
                {links.map((link, index) => (
                    <Link key={index} href={`/autorization/admin/${dictionary[link]}`} className={cn(styles.element, {
                        [styles.active]: value == link
                    })} onClick={() => setValue(link)}>{link}</Link>
                ))}
            </ul>
            <Button appearance="white" size="l" className={styles.btn} onClick={onExidHandler}>Вихід</Button>
        </div>
    )
}