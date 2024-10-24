"use server";

import { UpdateUserService, } from "../service/UpdateUserService";

/* 회원가입 action */
export async function UpdateUserAction(prevState: any, formData: FormData) {

    // 업데이트 유저 정보 불러오기
    const pointValue = formData.get("point");

    const user: User = { 
        username: (formData.get("username") as string) || "null", 
        name: (formData.get("name") as string) || "null",
        email: (formData.get("email") as string) || "null",
        number: (formData.get("number") as string) || "null",
        point: formData.get("point") ? Number(formData.get("point")) : null,
      };


    // 업데이트 유저 권한 불러오기 (서버의 User클래스와 클라이언트 User타입에 "권한" 변수가 없기 때문에 따로 불러옴)
    const userRole = formData.get("userRole") as string;

    let roleUser : String;

    if(userRole === "0"){
        roleUser = "null"
    }
    else if(userRole === "1"){
        roleUser = "ROLE_USER"
    }
    else if(userRole === "2"){
        roleUser = "ROLE_ADMIN"
    }
    else roleUser = "null";



  const responseData = await UpdateUserService(user, userRole);

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
