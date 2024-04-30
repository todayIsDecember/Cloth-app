'use client'

import { useEffect, useState } from "react";
import { RatingProps } from "./RatingProps";
import StarIcon from '../../../public/star.svg';
import cn from "classnames";
import styles from './Rating.module.css';
export const Rating = ({raiting, isEditable = false, setRating, ...props}: RatingProps): JSX.Element => {
    const [raitingArray, setRaitingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRaiting(raiting)
        }, [raiting])

    const constructRaiting = (currentRaiting: number) => {
        const updatedArray = raitingArray.map((r: JSX.Element, i: number) => {
            return (
                <StarIcon
                    key={i}
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRaiting,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(raiting)}
                    onClick={() => onClick(i + 1)}
                />
            )
        })
        setRaitingArray(updatedArray);
    }

    const changeDisplay = (i: number) => {
        if (!isEditable) {
            return;
        }
        constructRaiting(i);
    }

    const onClick = (i: number) => {
        if(!isEditable || !setRating) {
            return
        }
        setRating(i)
    }
    return (
        <div {...props}>
            {raitingArray.map((r, i) => (<span key={i}>{r}</span>))}
        </div>
    )
}