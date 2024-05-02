import { AOrderProps } from "./AOrderProps";
import cn from 'classnames'
import styles from './AOrder.module.css'
import UserIcon from './../../../../public/user_name.svg'
import PhoneIcon from './../../../../public/phone.svg'
import IdIcon from './../../../../public/id.svg'
import { Button, H } from "../../../components";
import Link from "next/link";

export const AORder = ({order, className, ...props}: AOrderProps): JSX.Element => {
    return (
        <div className={cn(className, styles.order)} {...props}>
            <UserIcon className={styles.userIcon}></UserIcon>
            <H tag="h3" className={styles.name}>{order.customer_name}</H>
            <PhoneIcon className={styles.phoneIcon}></PhoneIcon>
            <H tag="h3" className={styles.phone}>{order.phone}</H>
            <IdIcon className={styles.idIcon}></IdIcon>
            <H tag="h3" className={styles.id}>{order.id}</H>
            <Link href={`/autorization/admin/ordersPanel/order_${order.id}`} className={styles.button}><Button appearance="black" size="m">читати більше...</Button></Link>
        </div>
    )
}