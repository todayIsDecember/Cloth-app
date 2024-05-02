import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IOrder } from "../../../../interfaces/order.interface";

export interface AOrderDetailsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    order: IOrder
}