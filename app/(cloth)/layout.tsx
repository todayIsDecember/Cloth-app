import type { Metadata } from "next";
import { open_Sans } from '../ui/fonts'
import "../globals.css";
import { Footer, Header, Sidebar } from "../components";
import styles from "./layout.module.css";

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
      <head>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '3110262972404540');
                fbq('track', 'PageView');
              `,
            }}
          />
      </head>
      <meta name="google-site-verification" content="oa8G28xfIpydNia1_SGIQ1XlgjkcIpE7jJQIrQ8HbuE" />
      <body className={open_Sans.className}>
        <div className={styles.wrapper}>
          <Header className={styles.header}/>
          <Sidebar className={styles.sidebar}/>
          <div className={styles.body}>
            <div className={styles.previewPhoto}>
              <p className={styles.title}>Салон Тюлей та Штор</p>
              <p className={styles.subtitle}>Sofia</p>
            </div>
            {children}
            </div>
          <Footer className={styles.footer}/>
        </div>
      </body>
    </html>
  );
}
