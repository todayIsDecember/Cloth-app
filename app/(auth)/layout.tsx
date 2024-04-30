import type { Metadata } from "next";
import { open_Sans } from '../ui/fonts'
import "../globals.css";

export const metadata: Metadata = {
  title: "Головна",
  description: "салон тюлей та штор",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open_Sans.className}>
        {children}
      </body>
    </html>
  );
}