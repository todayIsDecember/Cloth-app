'use client'

import { SidebarProps } from "./Sidebar.props";
import cn from "classnames";
import styles from "./Sidebar.module.css";
import Link from 'next/link'
import { LinkCustom } from "..";
import {usePathname} from 'next/navigation'
import BasketIcon from '../../../public/basket.svg'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {

    const currentPath = usePathname()
    const [cookie, setCookie] = useState<string>('')
    const [value, setValue] = useState<number>(0)

    useEffect(() => {
        // Функція, яка оновлює значення куки та стану компонента
        const updateCookieAndState = () => {
          const newCookieValue = Cookies.get('product'); // Отримати значення куки
          setCookie(newCookieValue); // Оновити стан компонента
          setValue(newCookieValue ? JSON.parse(newCookieValue).length: 0); // Оновити значення стану компонента
        };
    
        // Отримання початкового значення куки та встановлення його як стан компонента
        const initialCookieValue = Cookies.get('product');
        setCookie(initialCookieValue);
    
        // Додавання слухача для оновлення куки та стану компонента при їх зміні
        const interval = setInterval(updateCookieAndState, 1000); // Перевіряти кожну секунду
    
        // Прибирання слухача при виході з компонента або зміні
        return () => {
          clearInterval(interval); // Зупинити перевірку при виході з компонента
        };
      }, []);
    

    return (
    <div className={cn(className, styles.sidebar)} {...props}>
        <Link href={'/'} className={styles.link}><LinkCustom isActive={currentPath === '/'? true: false}>Головна</LinkCustom></Link>
        <Link href={'/catalog'} className={styles.link} ><LinkCustom isActive={currentPath === '/catalog'? true: false}>Каталог</LinkCustom></Link>
        <Link href={'/reviews'} className={styles.link}><LinkCustom isActive={currentPath === '/reviews'? true: false}>Відгуки</LinkCustom></Link>
        <Link href={'/questions'} className={styles.link}><LinkCustom isActive={currentPath === '/questions'? true: false}>FAQ</LinkCustom></Link>
        <Link href={'/basket'} className={styles.link}><LinkCustom className={styles.basket} data-count={value} isActive={currentPath === '/basket'? true: false}><BasketIcon/></LinkCustom></Link>
    </div>
    );
}