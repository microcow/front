"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "../custom/SubmitButton";
import { SignUpAction, } from "@/app/actions/SignUpAction";
import { useEffect, useState, } from "react";
import CheckAuthAction from "@/app/actions/CheckAuthAction";
import ReadUserByUsernameAction from "@/app/actions/ReadUserAction";

const INITIAL_STATE = {
  data: null,
};

export function UserEditForm(username : UserNameProps) {
    
    /** 권한 확인 로직 */ 
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
        };
         checkauthStatus();
    }, []);


    /** username으로 유저 정보 불러오기 */
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchUser() {
          try {
            const userData = await ReadUserByUsernameAction(username);
            setUser(userData);
          } catch (error) {
            console.error("Error fetching user data:", error);
            alert("쿠키 정보를 불러오지 못했습니다. 다시 로그인해주세요.");
            window.location.href = "/signin";
          }
        }
        
        fetchUser();
    }, [username]);
    
    /** 회원정보 수정 page*/
    const [formState, formAction] = useFormState(SignUpAction,INITIAL_STATE);
    
    return (
    <form action={formAction}>
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                회원정보
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">회원명</label>
                    <input
                     type="text"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder={user?.name}
                    />
                </div>
                <div>
                    <button className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md">
                        회원탈퇴
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">아이디</label>
                    <input
                     type="text"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder={user?.username}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">E-Mail</label>
                    <input
                     type="email"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder={user?.email}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block mb-4 text-sm font-medium text-gray-700">
                        가입일
                    </label>
                    <span className="p-1 text-lg">
                        {user?.regisDateTime}
                    </span>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">휴대전화</label>
                    <input
                     type="tel"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder={user?.number}
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">성별</label>
                    <div className="mt-2 flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                             type="radio"
                             name="gender"
                             className="form-radio text-blue-500"
                             defaultChecked
                            />
                            <span className="ml-2">남자</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="gender" className="form-radio text-blue-500" />
                            <span className="ml-2">여자</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">포인트</label>
                    <div className="mt-1 flex items-center">
                        <span className="mr-4">{user?.point}</span>
                        <button className="bg-gray-300 py-1 px-1 text-xs rounded-md">변경</button>
                    </div>
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">권한</label>
                <select className="w-1/4 mt-1 p-2 border rounded-md">
                    <option>[1] 일반회원</option>
                    <option>[2] 관리자</option>
                </select>
            </div>
            <div className="flex justify-center">
                <SubmitButton className="w-1/6 mt-4" text="수정하기" loadingText="처리 중입니다." />
            </div>
            <Link className="underline ml-2" href="/admin/members">
                돌아가기
           </Link>
        </div>
    </form>
   );
}