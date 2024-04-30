import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LinkProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  isActive?: boolean;
}
