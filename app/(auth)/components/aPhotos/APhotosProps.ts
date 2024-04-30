import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface APhotosProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  images: string[],
  product_id: number
}