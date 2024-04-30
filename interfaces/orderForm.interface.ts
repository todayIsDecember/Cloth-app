import { IProductForm } from "./productForm.interface";

export interface IOrderForm {
  customer_name: string;
  phone: string;
  usedelivery: boolean;
  city: string;
  department: string;
  comment: string;
  price: number;
  products: IProductForm[];
}