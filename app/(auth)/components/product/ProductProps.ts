import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IProduct } from "../../../../interfaces/product.interface";

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct
  isActive?: boolean
}
