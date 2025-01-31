import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.scss';

import Footer from '@components/footer';
import Script from 'next/script';
import GoogleAnalytics from './google-analytics';
import Head from 'next/head';
import BackdropGradient from './backdrop-gradient';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});
export const metadata = {
  title: 'cgoing-blog',
  description: 'Development Blog',
  verification: {
    google: 'm2G9IHL8-nmIBJ5wEaGmT5YrwPXxaInoIP6-DU3zwp8',
  },
} as Metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <GoogleAnalytics />
      <Head>
        <meta
          name="google-site-verification"
          content="m2G9IHL8-nmIBJ5wEaGmT5YrwPXxaInoIP6-DU3zwp8"
        />
      </Head>

      <body
        className={`${roboto.className} text-default relative flex items-center h-full w-full flex-col bg-black`}
      >
        <BackdropGradient />
        <div className="max-w-full absolute">
          <main className="flex justify-center sm:px-8 min-h-screen ">
            <div className="relative w-full">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
