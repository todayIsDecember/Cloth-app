import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DropBoxProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    value: string;
    elements: string[];
    onSave?: (value: string) => void;
    isEditable?: boolean
}