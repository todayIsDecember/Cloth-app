import { AOrderDetailsProps } from "./AOrderDetailsProps";
import cn from 'classnames'
import styles from './AOrderDetails.module.css'
import { H } from "../../../components";
import UserIcon from './../../../../public/user_name.svg'
import PhoneIcon from './../../../../public/phone.svg'
import IdIcon from './../../../../public/id.svg'
import PriceIcon from './../../../../public/price.svg'
import CommentIcon from './../../../../public/comment.svg'
import DateIcon from './../../../../public/date.svg'
import Image from 'next/image'
import { API } from "../../../../helpers/api";

export const AOrderDetails = ({order, className, ...props}: AOrderDetailsProps): JSX.Element => {
    return (
        <div className={cn(className, styles.container)} {...props}>
            <div className={styles.customer_info}>
                <H tag="h1" className={styles.title}>Дані замовника</H>
                <UserIcon className={styles.userIcon}></UserIcon>
                <H tag="h3" className={styles.name}>{order.customer_name}</H>
                <PhoneIcon className={styles.phoneIcon}></PhoneIcon>
                <H tag="h3" className={styles.phone}>{order.phone}</H>
                <IdIcon className={styles.idIcon}></IdIcon>
                <H tag="h3" className={styles.id}>{order.id}</H>
                <DateIcon className={styles.date_name}></DateIcon>
                <H tag="h3" className={styles.date}>{order.created_at}</H>
                {order.usedelivery && (
                    <div className={styles.delivery}>
                        <H tag="h2" className={styles.delivery_title}>Доставка</H>
                        <H tag="h3" className={styles.city_name}>місто: </H>
                        <H tag="h3" className={styles.city}>{order.city}</H>
                        <H tag="h3" className={styles.department_name}>відділення:</H>
                        <H tag="h3" className={styles.department}>{order.department}</H>
                    </div>
                )}
                <PriceIcon className={styles.price_name}></PriceIcon>
                <H tag="h3" className={styles.price}>{order.price} грн</H>
                <CommentIcon className={styles.comment_name}></CommentIcon>
                <H tag="h3" className={styles.comment}>{order.comment}</H>
            </div>
            <div className={styles.details}>
                <H tag="h2" className={styles.details_title}>Деталі замовлення</H>
                <div className={styles.details_container}>
                    {order.order_details.map((detail, index) => (
                        <div className={styles.detail} key={index}>
                            <Image src={`${API.image.get}/${detail.products.photo[0]}`} width={150} height={150} alt="image" className={styles.image}/>
                            <div className={styles.detail_info}>
                                <H tag="h3" className={styles.detail_title}>{detail.products.name}</H>
                                <H tag="h3" className={styles.detail_width}>ширина: {detail.width} м</H>
                                <H tag="h3" className={styles.detail_height}>висота: {detail.height} м</H>
                                <H tag="h3" className={styles.detail_color}>колір: {detail.products.color}</H>
                                <H tag="h3" className={styles.detail_price}>ціна: {detail.price} грн</H>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}