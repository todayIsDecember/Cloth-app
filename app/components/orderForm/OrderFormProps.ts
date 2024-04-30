import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IProductForm } from "../../../interfaces/productForm.interface";

export interface OrderFormProps  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    products: IProductForm[]
}