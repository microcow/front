"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCookiesAction, deleteCookies } from "../actions/CookiesAction";

export default function TopNav() {

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
    <nav> 
      <div className="flex justify-end space-x-5 mb-1 font-bold text-xs container mx-auto">
        <Link href="/admin" className="text-orange-400">관리자</Link>
        {LoggedIn === "true" && (
         <button onClick={handleLogout} className="text-gray-500">로그아웃</button>
        )}
        {LoggedIn !== "true" && (
         <Link href="/signin" className="text-gray-500">로그인</Link>
        )}
        <Link href="/mypage" className="text-gray-500">마이페이지</Link>
        <Link href="/cart" className="text-gray-500">장바구니</Link>
        <Link href="/order-tracking" className="text-gray-500">주문/배송조회</Link>
        <Link href="/customer-service" className="text-gray-500">고객센터</Link>
      </div>
      <div className="border-b border-gray-300 pb-0"></div>

      <div className="flex justify-between items-center container mx-auto">
        <div>
         <Link href="/">
          <img src="/podo.png" alt="Podo Mall Logo" className="h-16" /> {/* src/app/public 폴더에 이미지를 넣고 public폴더는 루트경로인 "/" 로 인식됨" */}
         </Link>
        </div>
        <ul className="flex space-x-20 list-none m-0 font-bold text-xl">
          <li><Link href="/category" className="hover:text-purple-500"> 전체카테고리</Link></li>
          <li><Link href="/best-seller" className="hover:text-purple-500">베스트셀러</Link></li>
          <li><Link href="/new" className="hover:text-purple-500">신상품</Link></li>
          <li><Link href="/popular" className="hover:text-purple-500">인기상품</Link></li>
          <li><Link href="/sale" className="hover:text-purple-500">타임세일</Link></li>
        </ul>
        <div className="flex items-center">
          <input type="text" placeholder="검색어를 입력해주세요" className="border border-gray-300 rounded-md p-1" />
          <Button className="hover:bg-purple-500 hover:text-black font-bold bg-purple-500 text-white">검색</Button>
        </div>
      </div>
      <div className="border-b border-gray-300 pb-1"></div>
    </nav>
  );
}