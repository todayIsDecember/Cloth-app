import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    raiting: number;
    isEditable?: boolean;
    setRating?: (rating: number) => void;
}