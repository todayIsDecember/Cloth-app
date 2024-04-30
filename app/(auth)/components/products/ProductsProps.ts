import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IProduct } from "../../../../interfaces/product.interface";

export interface ProductsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  products: IProduct[]
}