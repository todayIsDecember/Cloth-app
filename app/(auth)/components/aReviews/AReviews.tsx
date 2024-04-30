'use client'

import { AReviewsProps } from "./AReviewsProps";
import cn from 'classnames';
import styles from './AReviews.module.css'
import { Alert, Review } from "../../../components";
import { Modal } from "../modalProducts/Modal";
import { useEffect, useState } from "react";
import { IReview } from "../../../../interfaces/review.interface";
import { API } from "../../../../helpers/api";

export const AReviews = ({reviews, className, ...props}: AReviewsProps) => {
    const [selectedReview, setSelectedReview] = useState<number>(0)
    const [status, setStatus] = useState<boolean>(false)
    const [reviewsArray, setReviewsArray] = useState<IReview[]>(reviews)
    const [success, setSuccess] = useState<boolean>(false)

    useEffect(() => {
        const deleteHandler = async () => {
            if(status !== true) {
                return
            }
            const response = await fetch(`${API.reviews.delete}/${selectedReview}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            if(!response.message) {
                setSuccess(true)
                setReviewsArray(prev => prev.filter(review => review.id !== selectedReview))
                setSelectedReview(0)
                setTimeout(() => setSuccess(false), 2000)
            }
        }

        deleteHandler()
    }, [status])
    const onClickReviewHandler = (id: number) => {
        if(selectedReview === id) 
            {
                setSelectedReview(0)
                return
            }
        setSelectedReview(id)
    }

    return (
        <>
            <div className={styles.container}>
                {reviewsArray.map((review) => (
                    <Review key={review.id} review={review} onClick={() => onClickReviewHandler(review.id)} isEditable={selectedReview === review.id}></Review>
                ))}
                <Modal variants="reviews" id_el={selectedReview} isActive={selectedReview !== 0} sendStatus={(status: boolean) => setStatus(status)}></Modal>
            </div>
            {success && <Alert appearance="success">Відгук видалено</Alert>}
        </>
    )
}