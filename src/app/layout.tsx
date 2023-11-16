import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.scss';

import Providers from '@/components/Providers';

import { siteConfig } from '@/constant/config';

const base = process.env.NEXT_PUBLIC_URL_BASE

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  themeColor: '#01052D',
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: [
    {
      rel:'apple-touch-icon',
      sizes:'57x57',
      url:'/common-assets/icons/apple-icon-57x57.webp',
    },
    {
      rel:'apple-touch-icon',
      sizes:'60x60',
      url:'/common-assets/icons/apple-icon-60x60.webp',
    },
    {
      rel:'apple-touch-icon',
      sizes:'72x72',
      url:'/common-assets/icons/apple-icon-72x72.webp',
    },
    {
      rel:'apple-touch-icon',
      sizes:'76x76',
      url:'/common-assets/icons/apple-icon-76x76.webp',
    },
    {
      rel:'apple-touch-icon',
      sizes:'114x114',
      url:'/common-assets/icons/apple-icon-114x114.webp',
    },
    {
      rel:'apple-touch-icon',
      sizes:'120x120',
      url:'/common-assets/icons/apple-icon-120x120.webp',
    },
    {
      rel:'apple-touch-icon',
      sizes:'144x144',
      url:'/common-assets/icons/apple-icon-144x144.webp',
    },
    {
      rel:'apple-touch-icon',
      sizes:'152x152',
      url:'/common-assets/icons/apple-icon-152x152.webp',
    },
    {
      rel:'apple-touch-icon',
      sizes:'180x180',
      url:'/common-assets/icons/apple-icon-180x180.webp',
    },
    {
      rel:'icon',
      type:'image/png',
      sizes:'192x192',
      url:'/common-assets/icons/android-icon-192x192.webp',
    },
    {
      rel:'icon',
      type:'image/png',
      sizes:'32x32',
      url:'/common-assets/favicons/favicon-32x32.webp',
    },
    {
      rel:'icon',
      type:'image/png',
      sizes:'96x96',
      url:'/common-assets/favicons/favicon-96x96.webp',
    },
    {
      rel:'icon',
      type:'image/png',
      sizes:'16x16',
      url:'/common-assets/favicons/favicon-16x16.webp',
    },
  ],
  manifest: `/manifest.json`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    // images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    // images: [`${siteConfig.url}/images/og.jpg`],
  },
  metadataBase: base ? new URL(base) : null
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
