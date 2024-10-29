"use server";

import { UpdateUserService, } from "../service/UpdateUserService";

/* 유저정보 업데이트 action */
export async function UpdateUserAction(prevState: any, formData: FormData) {

    // 업데이트 유저 정보 불러오기
    if(formData.get("index") == null || formData.get("index") === "null"){
      return "회원 정보를 불러오지 못했습니다."
    }

    const user: User = { 
        username: (formData.get("username") as string) || "null", 
        name: (formData.get("name") as string) || "null",
        email: (formData.get("email") as string) || "null",
        number: (formData.get("number") as string) || "null",
        point: (formData.get("point") as string) || "null",
        auth: formData.get("userRole") as string || "0",
        index: formData.get("index") as string
      };

    // 권한 설정(변동이 있을 경우)
    if(user.auth === "0"){
      user.auth = "null"
    }
    else if(user.auth === "1"){
      user.auth = "ROLE_USER"
    }
    else if(user.auth === "2"){
      user.auth = "ROLE_ADMIN"
    }
    else user.auth = "null";


  const responseData = await UpdateUserService(user);

  
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

  // 기대결과 return
  return {
    ...prevState,
    message: responseData,
  };
}
