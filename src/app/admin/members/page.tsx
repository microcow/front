"use client";

import { useEffect, useState } from "react";
import { ReadUserListService } from "@/app/service/readUserService";
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

export default function MembersPage() {
  const [userList, setUserList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  /* 회원 정보 불러오기 */
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const data = await ReadUserListService();
        setUserList(data);
      } catch (error) {
        console.error("Failed to fetch user list:", error);
      }
    };

    fetchUserList();
  }, []);

  /* 데이터가 로딩 중일 때 처리 */
  if (userList.length === 0) {
    return <div>Loading...</div>;
  }
  
  /* 주소정보 팝업 처리 */
  const openPopup = (address: string) => {
    setSelectedAddress(address); // 팝업 열기
  };

  const closePopup = () => {
    setSelectedAddress(null); // 팝업 닫기
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">회원 목록</h1>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-1 w-13">회원번호</th>
              <th className="border border-gray-300 p-1">아이디</th>
              <th className="border border-gray-300 p-1">이름</th>
              <th className="border border-gray-300 p-1">이메일</th>
              <th className="border border-gray-300 p-1">연락처</th>
              <th className="border border-gray-300 p-1">가입일</th>
              <th className="border border-gray-300 p-1">주소</th>
              <th className="border border-gray-300 p-1">포인트</th>
              <th className="border border-gray-300 p-1">제재여부</th>
              <th className="border border-gray-300 p-1">정보수정</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user: User) => (
              <tr key={user.index} className="text-center">
               <td className="border border-gray-300 p-1">{user.index}</td>
               <td className="border border-gray-300 p-1">{user.username}</td>
               <td className="border border-gray-300 p-1">{user.name}</td>
               <td className="border border-gray-300 p-1">{user.email}</td>
               <td className="border border-gray-300 p-1">{user.number}</td>
               <td className="border border-gray-300 p-1">{user.regisDateTime}</td>
               <td className="border border-gray-300 p-1">
                  <button
                    className="underline text-blue-500 hover:cursor-pointer"
                    onClick={() => openPopup(user.address ?? "null")}
                  >
                    확인
                  </button>
                </td>
               <td className="border border-gray-300 p-1">{user.point}</td>
               <td className="border border-gray-300 p-1">
                  {user.enabled && user.credentialsNonExpired &&
                   user.accountNonExpired && user.accountNonLocked ? (
                    <span className="text-green-500 text-xs">X</span>
                  ) : (
                    <span className="text-red-500 font-bold text-xs">O</span>
                  )}
                </td>
                <td className="border border-gray-300 p-1">
                  <Link
                    className="text-blue-500 underline hover:cursor-pointer"
                    href={`/admin/members/edit?id=${user.username}`}
                  >
                    수정하기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedAddress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-bold mb-4">회원 주소</h2>
              <p className="mb-6">{selectedAddress}</p>
              <Button
                className="bg-violet-500 text-white px-2 py-2 rounded hover:bg-violet-600"
                onClick={closePopup}
              >
                닫기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}