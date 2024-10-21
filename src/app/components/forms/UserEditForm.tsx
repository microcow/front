"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "../custom/SubmitButton";
import { SignUpAction, IdCheckAction } from "@/app/actions/SignUpAction";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { ZodErrors } from "../custom/ZodErrors";
import { ResultMessage } from "../custom/ResultMessage";
import { useEffect, useState } from "react";

const INITIAL_STATE = {
  data: null,
};

export function UserEditForm() {

  const [formState, formAction] = useFormState(SignUpAction,INITIAL_STATE);

  // 유저가 입력한 아이디값 실시간 저장 (onChange 사용, 입력을 멈춘 시점에서 0.2초 후 값 전송)
  let debounceTimer: NodeJS.Timeout | null = null;
  const [InputId, setInputId] = useState("");
  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceTimer) {
      clearTimeout(debounceTimer); // 이전 입력에 대한 타이머가 제거되어 새롭게 시작(마지막 입력이 0.2초를 경과할 경우에만 실행됨)
    }
    debounceTimer = setTimeout(() => {
     setInputId(value);
    }, 200);
  };

  return (
    <form>
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
                     placeholder="세글만"
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
                     placeholder="tubeweb3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">E-Mail</label>
                    <input
                     type="email"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder="tubeweb3@gmail.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        생년월일(8자)
                    </label>
                    <input
                     type="text"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder="예)19750101"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">휴대전화</label>
                    <input
                     type="tel"
                     className="w-full mt-1 p-2 border rounded-md"
                     placeholder="010-3333-3333"
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
                        <span className="mr-4">1,580 Point</span>
                        <button className="bg-gray-300 py-1 px-1 text-xs rounded-md">변경</button>
                    </div>
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">레벨</label>
                <select className="w-1/4 mt-1 p-2 border rounded-md">
                    <option>[9] 일반회원</option>
                    <option>[8] VIP회원</option>
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