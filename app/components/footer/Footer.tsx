import { FooterProps } from "./Footer.props";
import cn from "classnames";
import styles from "./Footer.module.css";
import TelegramIcon from '../../../public/telegram.svg'
import Link from 'next/link'
import { Button } from "../button/Button";

export const Footer = ({className, ...props}: FooterProps):JSX.Element => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <p className={styles.title}>Консультація</p>
            <Link href={'https://t.me/dydai87'}><TelegramIcon className={styles.icon}/></Link>
            <Link href={'./autorization'} className={styles.button}><Button appearance="black" size="m">Адмін панель</Button></Link>
        </footer>
    )
}