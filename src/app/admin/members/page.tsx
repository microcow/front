"use client";

import { useEffect, useState } from "react";
import { readUserListService } from "@/app/service/readUserService";

export default function MembersPage() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const data = await readUserListService();
        setUserList(data);
      } catch (error) {
        console.error("Failed to fetch user list:", error);
      }
    };

    fetchUserList();
  }, []);

  // 데이터가 로딩 중일 때 처리
  if (userList.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">회원 목록</h1>
      <ul className="space-y-2">
        {userList.map((user: any) => (
          <li
            key={user.index}
            className="p-4 border rounded-md bg-white shadow-sm"
          >
            <p className="font-medium">이름: {user.name}</p>
            <p>이메일: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}