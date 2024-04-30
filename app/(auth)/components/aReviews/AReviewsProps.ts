import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IReview } from "../../../../interfaces/review.interface";

export interface AReviewsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    reviews: IReview[]
}