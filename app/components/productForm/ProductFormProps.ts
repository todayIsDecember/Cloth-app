import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IProduct } from "../../../interfaces/product.interface";
import { IProductForm } from "../../../interfaces/productForm.interface";

export interface ProductFormProps  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  product: IProduct;
  handleOnChange: (formData) => void
}