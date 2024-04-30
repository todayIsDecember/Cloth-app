import type { Metadata } from "next";
import styles from "./layout.module.css";
import { ASidebar } from "../../components";

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
    <div className={styles.wrapper}>
      <ASidebar className={styles.sidebar}></ASidebar>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
}