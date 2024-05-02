import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IOrder } from "../../../../interfaces/order.interface";

export interface AOrdersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    orders: IOrder[]
}