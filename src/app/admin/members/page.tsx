"use client";

import { useEffect, useState } from "react";
import { ReadUserListService } from "@/app/service/ReadUserService";
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";

export default function MembersPage() {
  const [userList, setUserList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [searchCriteria, setSearchCriteria] = useState("회원번호"); // 회원 검색 카테고리
  const [searchInput, setSearchInput] = useState(""); // 회원 검색 키워드
  const [filteredUserList, setFilteredUserList] = useState([]); // 회원 검색 필터링 결과

  /* 모든 회원 정보 불러오기 */
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const data = await ReadUserListService();
        setUserList(data);
        setFilteredUserList(data); // 필터링 유저 목록을 모든 회원 정보로 최초설정
      } catch (error) {
        console.error("Failed to fetch user list:", error);
      }
    };

    fetchUserList();
  }, []);

  /* 검색 기능 처리(필터링) */
  const handleSearch = () => {
    const filteredList = userList.filter((user: any) => { // .filter 배열 메서드 : 주어진 조건을 만족하는 요소들만을 추출해 새로운 배열을 생성
      if (searchCriteria === "회원번호") {
        return user.index.toString().includes(searchInput); //.includes : 특정 문자열이 포함되어 있는지를 확인하는 메서드
      } else if (searchCriteria === "이름") {
        return user.name.includes(searchInput);
      } else if (searchCriteria === "아이디") {
        return user.username.includes(searchInput);
      }
      return false;
    });
    setFilteredUserList(filteredList);
  };

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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">회원 목록</h1>
          <div className="flex space-x-2">
            <select
              className="border border-gray-300 rounded p-1"
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
            >
              <option value="회원번호">회원번호</option>
              <option value="이름">이름</option>
              <option value="아이디">아이디</option>
            </select>
            <input
              type="text"
              className="border border-gray-300 rounded p-1"
              placeholder="검색어 입력"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={handleSearch}
            >
              검색
            </Button>
          </div>
        </div>
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
            {filteredUserList.map((user: User) => (
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
        {selectedAddress && ( // Truthy Check: 이 조건은 selectedAddress 값이 null, undefined, 빈 문자열 "", 0, NaN, false가 아닌 경우에 truthy로 평가
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
