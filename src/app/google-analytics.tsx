'use client';
import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-JTEWZN846N"
      onLoad={() => {
        const self = window as any;
        self.dataLayer = self.dataLayer || [];
        function gtag(...args: any[]) {
          self.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', 'G-JTEWZN846N');
      }}
    />
  );
}
