"use client";

export default function Banner({ onClose }: { onClose: () => void }) {

  const handleBannerClose = () => {
      onClose(); // 호출자에게 알림 (RootLayout.tsx의 handleBannerClose 함수 실행)
  };

  return (
    <div className="relative">
      {/* 배너 */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#F2877F]
             bg-[url('http://demofran.com/data/banner/szEreKjpPshELPSNnS8esg8RXvRd5T.jpg')]
              bg-no-repeat bg-center h-[65px] border-b border-gray-300 flex justify-between items-center px-4  
        }`}
      >
        <a href="/shop/listtype.php?type=4" target="_self"></a>
        {/* 닫기 버튼 */}
        <button onClick={handleBannerClose} className="text-white text-2xl">
          X
        </button>
      </div>
    </div>
  );
}