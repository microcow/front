"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCookiesAction, deleteCookies } from "../actions/CookiesAction";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
 /* 쿠키(로그인 사실)확인 */
 const [LoggedIn, setLoggedIn] = useState("null");

 useEffect(() => {
   const checkLoginStatus = async () => {
     const result = await CheckCookiesAction();

     if (result === "true") {
       setLoggedIn("true");
     } 
     else if(result === "refreshToken error"){
       setLoggedIn("refreshToken error");
     }
     else if(result === "expired") {
       setLoggedIn("expired");
     }
   };
   checkLoginStatus();
 }, []);
 
 // 로그인 상태가 확인될 때까지 렌더링하지 않음 (사이드 이펙트방지. but 렌더링 딜레이가 체감됨 *수정 필요)
 if (LoggedIn === "null") {
   return null;
 }

 // 쿠키 삭제 함수 (deleteCookies 함수는 "use server" 함수이기에 직접 호출이 불가하여 handleLogout 함수를 통해 간접적으로 호출)
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
              <Link href="#" className="hover:underline">
                관리자홈
              </Link>
              <Link href="#" className="hover:underline">
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
            </div>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
 );
}