"use client"

import { useEffect, useState } from 'react';
import TopNav from './ui/topnav';
import { inter } from './ui/fonts';
import '@/app/ui/global.css';
import Banner from '@/app/ui/banner';

const BANNER_HIDDEN_DURATION = 30000; // 배너 재등장 시간 30초로 임시 설정 // 24 * 60 * 60 * 1000; // 24시간

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  /* 배너 로딩 상태 관리 */
  const [isLoading, setIsLoading] = useState(false); 

  /* 배너 상태 관리 (로컬 스토리지 사용) */
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  // 로컬 스토리지에서 현재 시간과 배너가 닫힌 시간을 비교 (설정한 시간 초과 시 배너 재노출)
  useEffect(() => {
    const storedBannerCloseTime = localStorage.getItem('bannerCloseTime');
    
    if (storedBannerCloseTime) {
      const closeTime = new Date(parseInt(storedBannerCloseTime, 10));
      const currentTime = new Date();

      if (currentTime.getTime() - closeTime.getTime() < BANNER_HIDDEN_DURATION) {
        setIsBannerVisible(false);
      }
      else setIsBannerVisible(true);
    }

    setIsLoading(true); 
  }, []);

  const handleBannerClose = () => {
    setIsBannerVisible(false);
    localStorage.setItem('bannerCloseTime', Date.now().toString()); // 배너 닫힌 시간을 로컬 스토리지에 저장
  };

  // 배너 로딩전 렌더링하지 않음 (RootLayout이기에 null을 return하면 console에서 에러 발생)
  if (!isLoading) {
    return (
    <html lang="ko">
      <body>
      </body>
      </html>
      )
    }

  return (
    <html lang="ko">
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

        {/* 본문 내용 */}
        <div className={`transition-all duration-200 ${isBannerVisible ? 'pt-[130px]' : 'pt-[65px]'}`}>
          {children}
        </div>
      </body>
    </html>
  );
}