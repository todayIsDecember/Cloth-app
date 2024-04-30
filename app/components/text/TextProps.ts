import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    children: React.ReactNode
}