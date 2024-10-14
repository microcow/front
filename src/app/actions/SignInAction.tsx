"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignInService } from "../service/SignInService";

 /* access cookie config 설정 */
const config = { 
  maxAge: 60 * 5, // 5분 (300초)
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.PROTOCOL === "https",
  };

  /* refreshToken config 설정 */
  const refreshTokenConfig = {
    maxAge: 60 * 60 * 24 * 30,
    path: "/", // path: "/api/refreshToken", // 리프레시 토큰을 사용할 경로로 제한 (해당 경로외 접근 불가, 개발을 위해 path를 "/" 로 임시 설정 )
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.PROTOCOL === "https",
  };

/* 로그인 action */
export async function SignInAction(prevState: any, formData: FormData) {

  // zod 설정 
  const schemaRegister = z.object({
   username: z.string()
     .min(3, { message: "아이디는 3글자 이상이어야 합니다." })
     .max(20, { message: "아이디는 20글자 이하여야 합니다." }),
   password: z.string()
     .min(6, { message: "비밀번호는 6글자 이상이어야 합니다." })
     .max(20, { message: "비밀번호는 20글자 이하여야 합니다." }),
  });


  // zod 검사
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("id"), // 서버로 보낼 때 id 값을 username이라는 값으로 사용하기 위해 username 객체에 매치
    password: formData.get("password"),
  });

  // zod 검사 실패 로직
  if (!validatedFields.success) { 
    return {
     ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors, 
    };
  }
  
  // 서버통신 함수에 값 전달(zod 통과 시)
  const responseData = await SignInService(validatedFields.data);

  // 서버응답 실패로직
  if (!responseData) {
    console.log('server error', '서버 응답 없음')
    return {
      ...prevState,
      message: "오류가 발생했습니다. 다시 시도해주세요.",
    };
  }

  // 서버작업 실패로직(서버에서 실패내용을 json으로 return)
  else if (responseData.message) {
    console.log('error', '서버 응답은 있지만 error발생')
    return {
      ...prevState,
      message: responseData.message,
    };
  }

  // 토큰 return 시 쿠키 세팅
  else if(responseData.accessToken){
   cookies().set("jwt", responseData.accessToken, config);
   cookies().set("refreshToken", responseData.token, refreshTokenConfig);
   redirect("/");
  }
}