import { Metadata } from "next"
import styles from './page.module.css'
import { Review, ReviewForm } from "../../components"
import { getAllReviews } from "../../API/getAllReviews"

export const metadata: Metadata = {
    title: "Відгуки",

}

export default async function Reviews ():Promise<JSX.Element> {
    const reviews = await getAllReviews()
    return (
        <div className={styles.wrapper}>
            <ReviewForm className={styles.form}></ReviewForm>
            <div className={styles.reviews}>
                {reviews.map((review) => (
                    <Review key={review.id} review={review} />
                ))}
            </div>
        </div>
    )
}