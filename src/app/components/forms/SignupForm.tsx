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

export function SignupForm() {

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

  // 아이디 중복확인 로직
  const [IdCheckResult, setIdCheckResult] = useState("");
  const handleIdCheck = async () => {
    const result = await IdCheckAction(InputId);
    if (result.message) {
    setIdCheckResult(result.message);
    } else {
    setIdCheckResult("오류가 발생했습니다. 다시 시도해주세요");
    }
  }

  // 아이디 중복확인 여부
  const [IdCheckComplete, setIdCheckComplete] = useState(false);
  useEffect(() => {
    if(IdCheckResult === "사용가능 한 아이디입니다.") {
      setIdCheckComplete(true);
    } else {
      setIdCheckComplete(false);
    }
  }, [IdCheckResult]);

  // 중복확인 텍스트 css 설정
  const messageStyles: Record<string, string> = { // Record<string, string>: key 값이 String임을 명시적으로 정의
    "아이디는 3글자 이상 20글자 이하입니다.": "text-red-400 text-xs",
    "이미 존재하는 아이디입니다.": "text-red-400 text-xs",
    "사용가능 한 아이디입니다.": "text-green-400 text-xs",
  };

  // 아이디 중복확인 실패 후 회원가입 버튼 클릭 시 로직
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!IdCheckComplete) {
      e.preventDefault();
      alert("아이디 중복확인이 필요합니다.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen"> {/* mt-24를 추가하여, error메시지가 출력하더라도 상단바에 form이 가려지지 않도록 */}
      <form className="w-[500px]" action={formAction} onSubmit={handleSubmit}>
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
              <div className="flex space-x-2">
                <Input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="아이디"
                  onChange={handleInputId}
                />
                <button
                  type="button" // type을 submit으로 해서 id 필드의 값을 제출하지 않고, onChange로 값을 사용하는 이유는 해당 버튼의 타입이 submit이 될 경우 form 전체가 제출되기 때문
                  className="rounded-md px-2 py-1 bg-black text-white text-xs w-1/6"
                  id={InputId}
                  onClick={handleIdCheck}
                >
                중복확인
                </button>
              </div>
              <div>
                 {IdCheckResult && (
                  <div className={messageStyles[IdCheckResult] || "text-black text-xs"}>
                   {IdCheckResult}
                  </div>
                 )}
                </div>
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
                id="checkpassword"
                name="checkpassword"
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
            </div>
            <ZodErrors error={formState?.zodErrors?.number} />
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
                id="address"
                name="address"
                type="text"
                placeholder="주소"
               />
               <ZodErrors error={formState?.zodErrors?.address} /> {/* Input 아래로 에러 메시지 배치 */}
             </div>
             <button
               type="button"
               className="rounded-md bg-black text-white text-xs w-1/6"
               >
                주소검색
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
           <SubmitButton className="w-full" text="회원가입" loadingText="처리 중입니다." />
           <ResultMessage resultmessage={formState?.message} />
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