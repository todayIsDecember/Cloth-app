import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ButtonProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    appearance: "white" | "black" | "transparent";
    size: "m" | "l";
    isActive?: boolean;
}