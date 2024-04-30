import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface NavigationProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    selectedValue: (value: string) => void
}