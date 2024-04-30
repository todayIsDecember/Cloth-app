import { DetailedHTMLProps, HTMLAttributes } from "react"

export interface AutoComplitProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: 'населений пункт' | 'відділення';
  getResponse: (value: string[]) => Promise<string[]>;
  onSave: (value: string) => void;
  city?: string
}