export type Nullable<T> = T | null;

export interface IOrder {
    id: number;
    customer_name: string;
    phone: string;
    created_at: string;
    usedelivery: boolean;
    city: Nullable<string>;
    department: Nullable<string>;
    price: number;
    comment: Nullable<string>;
    order_details: OrderDetail[];
}

export interface OrderDetail {
    id: number;
    product_id: number;
    order_id: number;
    height: number;
    width: number;
    isfinished: boolean;
    price: number;
    products: Products;
}

export interface Products {
    color: string;
    name: string;
    photo: string[];
}
