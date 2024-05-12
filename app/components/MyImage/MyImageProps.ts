import { DetailedHTMLProps, HTMLAttributes } from "react"

export interface MyImageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    images: string[],
    description: string
}