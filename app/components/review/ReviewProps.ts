import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IReview } from "../../../interfaces/review.interface";

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    review: IReview
    isEditable?: boolean
}