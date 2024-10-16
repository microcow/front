"use client"

import { useState } from 'react';
import TopNav from './ui/topnav';
import { inter } from './ui/fonts';
import '@/app/ui/global.css';
import Banner from '@/components/ui/banner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  /* 배너 상태 관리 */
  const [isBannerVisible, setIsBannerVisible] = useState(true); 

  const handleBannerClose = () => {
    setIsBannerVisible(false);
  };

  return (
    <html>
      <body className={`${inter.className} antialiased`}>

        {/* 배너 */}
        {isBannerVisible && (
          <div>
            <Banner onClose={handleBannerClose} />
          </div>
        )}

        {/* TopNav */}
        <div
          className={`fixed left-0 w-full pt-1 bg-[#FFFFFF] transition-all duration-200 ${
            isBannerVisible ? 'top-[65px]' : 'top-0'
          }`}
        >
          <TopNav />
        </div>

        {/* 페이지 내용 */}
        <div className={`transition-all duration-200 ${isBannerVisible ? 'pt-[130px]' : 'pt-[65px]'}`}>
          {children}
        </div>

      </body>
    </html>
  );
}