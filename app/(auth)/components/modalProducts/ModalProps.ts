import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IProduct } from "../../../../interfaces/product.interface";
import { IPrices } from "../../../../interfaces/prices.interface";
import { IReview } from "../../../../interfaces/review.interface";

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id_el: number
  variants: 'product' | 'reviews' | 'price'
  isActive?: boolean
  sendStatus?: (status: boolean) => void
}