import { cookies } from "next/headers";
import { CheckCookiesAction } from "./CookiesAction";
import { CheckAuthService } from "../service/CheckAuthService";

interface auth {
  authority : string;
}

/* 권한 확인 컴포넌트 */

export default async function CheckAuthAction() {

  const checkCookie = await CheckCookiesAction();

  if (checkCookie === "true"){
    const cookie = cookies().get("jwt");
     if (cookie?.value) {
      const Result: auth[] = await CheckAuthService(cookie.value);
      const hasAdminRole = Result.some(auth => auth.authority === "ROLE_ADMIN"); // some : 배열의 최소 한 개의 요소가 특정 조건을 만족하는지 확인
      if (hasAdminRole) {
        return "권한이 확인되었습니다.";
      } else {
        return "권한이 없습니다.";
      }
    }
  }
  else return "로그인이 필요합니다."
}