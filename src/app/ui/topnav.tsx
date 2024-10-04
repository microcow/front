import Link from "next/link";
import { inter } from "./fonts";
import { Button } from "@/components/ui/button";

export default function TopNav() {

  return (
    <nav className={`p-3 border-b border-gray-400 fixed top-0 left-0 w-full z-50 bg-white`}> {/*  top-0 left-0 w-full z-50 bg-white : 화면 상단에 고정 */}
      
      <div className="flex justify-end space-x-5 mb-1 font-bold text-xs border-b border-gray-300 pb-1">
        <Link href="/admin" className="text-orange-400">관리자</Link>
        <Link href="/signin" className="text-gray-500">로그인</Link>
        <Link href="/mypage" className="text-gray-500">마이페이지</Link>
        <Link href="/cart" className="text-gray-500">장바구니</Link>
        <Link href="/order-tracking" className="text-gray-500">주문/배송조회</Link>
        <Link href="/customer-service" className="text-gray-500">고객센터</Link>
      </div>

      <div className="flex justify-between items-center">
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
    </nav>
  );
}