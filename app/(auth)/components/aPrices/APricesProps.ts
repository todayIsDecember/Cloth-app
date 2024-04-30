import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IPrices } from "../../../../interfaces/prices.interface";

export interface APricesProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    price: IPrices
}