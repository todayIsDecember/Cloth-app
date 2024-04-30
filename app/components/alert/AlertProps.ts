import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactNode;
    appearance: "error" | "success" | "warning" | "info";
}