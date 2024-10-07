"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "../custom/SubmitButton";
import { SignUpAction } from "@/app/actions/SignUpAction";

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
import { ZodErrors } from "../custom/ZodErrors";

const INITIAL_STATE = {
  data: null,
};

export function SignupForm() {
  const [formState, formAction] = useFormState(SignUpAction,INITIAL_STATE);

  return (
    <div className="flex justify-center items-center min-h-screen mt-24"> {/* mt-24를 추가하여, error메시지가 출력하더라도 상단바에 form이 가려지지 않도록 */}
      <form className="w-[500px]" action={formAction}>
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
                id="id"
                name="id"
                type="text"
                placeholder="아이디"
              />
              <ZodErrors error={formState?.zodErrors?.id} />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호 확인"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
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
              <ZodErrors error={formState?.zodErrors?.name} />
            </div>
            <div className="flex space-x-1">
              <Input
                id="number1"
                name="number1"
                type="number"
                placeholder="연락처"
              />
              <div className="text-lg text-gray-500">-</div>
              <Input
                id="number2"
                name="number2"
                type="number"
              />
              <div className="text-lg text-gray-500">-</div>
              <Input
                id="number3"
                name="number3"
                type="number"
              />
             <ZodErrors error={formState?.zodErrors?.number} />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="이메일(email@email.com)"
              />
              <ZodErrors error={formState?.zodErrors?.email} /> 
            </div>
            <div className="flex space-x-2">
             <div className="flex flex-col w-5/6"> {/* Input과 ZodErrors를 세로로 배치 */}
              <Input
                id="adress"
                name="adress"
                type="text"
                placeholder="주소"
               />
               <ZodErrors error={formState?.zodErrors?.adress} /> {/* Input 아래로 에러 메시지 배치 */}
             </div>
             <button
               type="button"
               className="px-2 py-1 bg-black text-white text-xs w-1/6"
               >
                주소검색
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
           <SubmitButton className="w-full" text="회원가입" loadingText="처리 중입니다." />
          </CardFooter>
        </Card>
        <div className="mt-3 text-center text-sm">
            이미 회원 아이디가 있으신가요?
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