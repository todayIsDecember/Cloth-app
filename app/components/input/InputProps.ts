import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  inputValue: string,
  typeBtn?: string,
  value?: string,
  createInput?: boolean
}