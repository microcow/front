"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "../custom/SubmitButton";
import { useEffect, useState, } from "react";
import CheckAuthAction from "@/app/actions/CheckAuthAction";
import ReadUserByUsernameAction from "@/app/actions/ReadUserAction";
import { DeleteUserService } from "@/app/service/DeleteUserService";
import { UpdateUserAction } from "@/app/actions/UpdateUserAction";

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

    /** 회원탈퇴 함수 */
    const deleteID = async () => {
        const confirmation = confirm("정말로 회원탈퇴를 진행하시겠습니까?"); // confirm 함수는 확인버튼을 누르면 true를 return
        if (confirmation) {
            try {
                const result = await DeleteUserService(user?.username);
                if(result === "삭제완료"){
                    alert("회원탈퇴가 완료되었습니다.");
                    window.location.href = "/admin/members";
                }
                else if(result !== "삭제완료"){
                    alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.")
                    window.location.href = "/admin/members";
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
                window.location.href = "/admin/members";
            }
        }
    };
    
    /** 회원정보 수정 page*/
    const [formState, formAction] = useFormState(UpdateUserAction,INITIAL_STATE);
    
        // 실행결과 메시지 출력
    if(formState.message != null){ 
        alert(formState.message);
        window.location.href = "/admin/members";
    }
    
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
                     name="name"
                    />
                </div>
                <div>
                    <button 
                     className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md"
                     onClick={deleteID}
                     >
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
                     name="username"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">이메일</label>
                    <input
                     type="email"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder={user?.email}
                     name="email"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">휴대전화</label>
                    <input
                     type="tel"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder={user?.number}
                     name="number"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">보유 포인트</label>
                        <input
                         type="tel"
                         className="w-1/2 mt-1 p-2 border rounded-md"
                         placeholder={user?.point}
                         name="point"
                        />
                </div>
                <div>
                    <input
                        type="hidden"
                        name="index"
                        value={user?.index}
                    />
                </div>          
            </div>
            
            <div>
                <label className="block mb-0 text-sm font-medium text-gray-700">
                    가입일
                </label>
                <span className="p-1 text-lg">
                    {user?.regisDateTime}
                </span>
            </div>

            <div>
                <label className="block mt-3 text-sm font-medium text-gray-700">권한부여</label>
                <select name="userRole" className="w-1/4 mt-1 p-2 border rounded-md">
                    <option value="0"> [0] 미선택 </option>
                    <option value="1"> [1] 일반회원 </option>
                    <option value="2"> [2] 관리자 </option>
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