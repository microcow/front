"use server"; // 쿠키는 서버측에서 확인

import { cookies } from "next/headers";
import { refreshTokenService } from "../service/refreshTokenService";

const config = { 
    maxAge: 60 * 5, // 5분 (300초)
      path: "/",
      domain: process.env.HOST ?? "localhost",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && process.env.PROTOCOL === "https",
    };

export async function CheckCookiesAction() {

    const jwtToken = cookies().get("jwt")
    const refreshToken = cookies().get("refreshToken")

    // jwt 액세스 쿠키가 유효할 경우
    if(jwtToken){ 
        console.log("이미 발급됨")
        return "true";
    }

   // jwt 액세스 쿠키는 만료되었지만 refreshToken이 유효할 경우(액세스 쿠키 갱신)
    else if (!jwtToken && refreshToken) { 
        const refreshTokenResult = await refreshTokenService(refreshToken?.value) // refreshToken으로 액세스 쿠키 재발급 요청(리프레쉬 토큰의 value값을 전달)
       
        if(refreshTokenResult.accessToken){
            
            cookies().set("jwt", refreshTokenResult.accessToken, config);
            console.log("재발급완료")
            return "true";
            
        }
        else
        return "refreshToken error"
    }

    // jwt 액세스 쿠키와 refreshToken 모두 만료되었을 경우 (재로그인 유도)
    else if (!jwtToken && !refreshToken) { 
        console.log("만료됨")
        return "expired";
    }

}