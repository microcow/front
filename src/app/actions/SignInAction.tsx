"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignInService } from "../service/SignInService";
import { getConfig, getRefreshTokenConfig } from "./CookiesAction";


/* 로그인 action */
export async function SignInAction(prevState: any, formData: FormData) {

  /* access cookie config 설정 */
  const config = await getConfig();

  /* refreshToken config 설정 */
  const refreshTokenConfig = await getRefreshTokenConfig();

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
   redirect("/"); // 서버측에서 redirect로 / 경로에 redirect 시 페이지가 리랜더링되지 않음 *수정 필요
  }
}