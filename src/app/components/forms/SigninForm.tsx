"use client";

import Link from "next/link";

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
import { useFormState } from "react-dom";
import { loginUserAction } from "@/app/actions/authactions";
import { Button } from "@/components/ui/button";

const INITIAL_STATE = {
  data: null,
};

export function SigninForm() {
 // const [formState, formAction] = useFormState(loginUserAction,INITIAL_STATE);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-[500px]"> {/*action={formAction}>*/}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">회원 로그인</CardTitle>
            <CardDescription>
             로그인하시면 다양한 서비스와 혜택을 받으실 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userid">회원 아이디</Label>
              <Input
                id="userid"
                name="userid"
                type="text"
                placeholder="아이디"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full font-bold">로그인</Button>
          </CardFooter>
        </Card>
        <div className="mt-2 text-center text-sm">
          회원 아이디가 없으신가요?
          <Link className="underline ml-2" href="signup">
            회원 가입
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