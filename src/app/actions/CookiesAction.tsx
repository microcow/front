"use server"; // 쿠키는 서버측에서 확인

import { cookies } from "next/headers";
import { refreshTokenService, DeleterefreshTokenService } from "../service/refreshTokenService";
import { getAuthByCookieService } from "../service/CookiesService";

   /* access cookie config 설정 */
  const config = { 
    maxAge: 60 * 5, // 5분 (300초)
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.PROTOCOL === "https",
  };

  export async function getConfig(){
    return config;
  }

  /* refreshToken config 설정 */
  const refreshTokenConfig = {
    maxAge: 60 * 60 * 24 * 30 + 9 * 3600, // 30일 + 9시간 (UTC+9) 추가
    path: "/", // path: "/api/refreshToken", // 리프레시 토큰을 사용할 경로로 제한 (해당 경로외 접근 불가, 개발을 위해 path를 "/" 로 임시 설정)
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.PROTOCOL === "https",
  };

  export async function getRefreshTokenConfig(){
    return refreshTokenConfig;
  }

  /* 쿠키 체크 액션 */
export async function CheckCookiesAction() {

    const jwtToken = cookies().get("jwt")
    const refreshToken = cookies().get("refreshToken")

    // jwt 액세스 쿠키가 유효할 경우
    if(jwtToken){ 
        return "true";
    }

   // jwt 액세스 쿠키는 만료되었지만 refreshToken이 유효할 경우(액세스 쿠키 갱신)
    else if (!jwtToken && refreshToken) { 
        const refreshTokenResult = await refreshTokenService(refreshToken?.value) // refreshToken으로 액세스 쿠키 재발급 요청(리프레쉬 토큰의 value값을 전달)
        if(refreshTokenResult.accessToken){
            cookies().set("jwt", refreshTokenResult.accessToken, config);
            return "true"; 
        }
        else
        return "refreshToken error"
    }

    // jwt 액세스 쿠키와 refreshToken 모두 만료되었을 경우 (재로그인 유도)
    else if (!jwtToken && !refreshToken) { 
        return "expired";
    }

}

  /* 쿠키 삭제 액션 */
export async function deleteCookies() {

    /* DB에 저장된 refreshToken 삭제 로직 (액세스 토큰은 DB에 저장하지 않음) */
    const refreshToken = cookies().get("refreshToken");
     if(refreshToken && refreshToken.value){
       const Result = await DeleterefreshTokenService(refreshToken.value);
     }

    /* 클라이언트에 저장된 쿠키 삭제 로직 (만료시간을 0으로 설정하여 삭제) */
    const cookieStore = cookies();
    
    // "jwt" 쿠키 삭제 
    cookieStore.set("jwt", "", {
      ...config, // 기존 설정 유지
      maxAge: 0, 
    });
  
    // "refreshToken" 쿠키 삭제
    cookieStore.set("refreshToken", "", {
      ...refreshTokenConfig,
      maxAge: 0, 
    });
}

  /* 쿠키로 권한 확인 */
  export async function getAuthByCookieAction() {

    const cookieState = await CheckCookiesAction();

    if (cookieState === "true"){
       const cookie = cookies().get("jwt");
        if(cookie?.value){
           const Result = await getAuthByCookieService(cookie.value);
     }
    }
    else return ("/login")
}