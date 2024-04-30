import { API } from "../../helpers/api";
import { IOrderForm } from "../../interfaces/orderForm.interface";

export const createOrder = async(formData: IOrderForm) => {

    const response = await fetch(API.orders.create, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const data = await response.json()
    return data;
}