"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
// import { registerUserAction } from "@/app/lib/actions";
import { SubmitButton } from "../custom/SubmitButton";
import DaumPostcode from 'react-daum-postcode';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const INITIAL_STATE = {
  data: null,
};

export function SignupForm() {
  // const [formState, formAction] = useFormState(registerUserAction,INITIAL_STATE);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-[500px]"> {/* action={formAction} */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">회원 가입
            </CardTitle>
            <CardDescription>
             세부 정보를 입력해주세요.
            </CardDescription>
            <div className="w-full border-t border-gray-400 my-4"></div>
          </CardHeader>
          
          <CardContent className="space-y-2">
            <div className="text-xs text-gray-500 ">사이트 이용정보 입력</div>
            <div className="space-y-2">
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="아이디"
              />   
            </div>

            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호 확인"
              />
            </div>
            
            <div className="space-y-4">
             <div className="w-1/3 border-t border-gray-300 mx-auto"></div>
             <div className="text-xs text-gray-500">개인정보 입력</div>
            </div>

            <div className="space-y-2">
              <Input
                id="name"
                name="name"
                type="name"
                placeholder="이름"
              />     
            </div>
            <div className="flex space-x-1">
              <Input
                id="phone1"
                name="phone1"
                type="phone"
                placeholder="연락처"
              />
              <div className="text-lg text-gray-500">-</div>
              <Input
                id="phone2"
                name="phone2"
                type="phone"
                
              />
              <div className="text-lg text-gray-500">-</div>
              <Input
                id="phone3"
                name="phone3"
                type="phone"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="이메일(email@email.com)"
              />     
            </div>
            <div className="flex space-x-2">
              <Input
                id="adress"
                name="adress"
                type="text"
                placeholder="주소"
              />     
              <button
              type="button"
              className="px-2 py-1 bg-black text-white text-xs w-1/6"
            >
              주소검색
            </button>
            </div>
            
              
            
          </CardContent>
          <CardFooter className="flex flex-col">
           <SubmitButton className="w-full" text="Sign Up" loadingText="Loading" />
          </CardFooter>
        </Card>
        <div className="mt-3 text-center text-sm">
          회원 아이디가 있으신가요?
          <Link className="underline ml-2" href="signin">
            로그인
          </Link>
        </div>
        <div className="mt-1 text-center text-sm">
          <Link className="underline ml-2" href="/">
            Home
          </Link>
        </div>
      </form>
    </div>
  );
}