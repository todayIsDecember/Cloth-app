'use'

import { ReviewProps } from "./ReviewProps"
import cn from 'classnames';
import styles from './Review.module.css';
import UserIcon from '../../../public/user.svg'
import { H, Rating, Text } from "..";

export const Review = ({review, className, isEditable = false, ...props}: ReviewProps): JSX.Element => {
    return (
        <div className={cn(className, styles.review, {[styles.editable]: isEditable})} {...props}>
            <UserIcon className={styles.userIcon}></UserIcon>
            <H tag="h3" className={styles.name}>{review.name}</H>
            <Text className={styles.description}>{review.description}</Text>
            <Rating raiting={Number(review.raiting)} className={styles.raiting}></Rating>
        </div>
    )
}