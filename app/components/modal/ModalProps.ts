import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    images? : string[]
    onClose : () => void
    isOpen: boolean,
    type: string,
    loading?: boolean
    loaded?: boolean,
    recieverName?: string
}