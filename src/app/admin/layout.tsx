"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCookiesAction, deleteCookies } from "../actions/CookiesAction";
import CheckAuthAction from "../actions/CheckAuthAction";

export default function AdminLayout({ children }: { children: React.ReactNode }) {


   /** 권한 확인 로직 */
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkauthStatus = async () => {
      const CheckAuth = await CheckAuthAction();

      if (CheckAuth === "로그인이 필요합니다."){
        alert(CheckAuth);
        window.location.href = "/signin";
      }

      else if (CheckAuth !== "권한이 확인되었습니다."){
        alert(CheckAuth);
        window.location.href = "/";
      }
      else {
        setIsLoading(true);
      }
    };
    checkauthStatus();
  }, []);

  if (!isLoading) {
    return null;
  }


  /** 쿠키 삭제(로그아웃) 함수 */
 const handleLogout = async () => {
   await deleteCookies();
   alert("로그아웃 되었습니다.")
   window.location.href = "/";
 };
 

 return (
  <html lang="ko">
      <body className="bg-gray-100">
        <header className="bg-gray-800 text-white">
          <div className="flex justify-between items-center px-6 py-2">
            <div className="text-2xl font-light">Administrator</div>
            <div className="flex space-x-4 text-sm">
              <Link href="#" className="hover:underline">
                관리자정보
              </Link>
              <Link href="/admin" className="hover:underline">
                관리자홈
              </Link>
              <Link href="/" className="hover:underline">
                쇼핑몰
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline">
                로그아웃
              </button>
            </div>
          </div>
            <div className="bg-gray-700 flex space-x-6 px-4 py-1 text-s">
              <Link href="/admin/members" className="text-white hover:bg-gray-600 px-3 py-2 rounded-md">
                회원관리
              </Link>
              <Link href="/admin" className="text-white hover:bg-gray-600 px-3 py-2 rounded-md">
                상품관리
              </Link>
              <Link href="/admin" className="text-white hover:bg-gray-600 px-3 py-2 rounded-md">
                상품등록
              </Link>
              <Link href="/admin" className="text-white hover:bg-gray-600 px-3 py-2 rounded-md">
                주문관리
              </Link>
            </div>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
 );
}