"use server"

import { cookies } from "next/headers";
import { ReadUserByUsernameService } from "../service/readUserService";

export default async function ReadUserByUsernameAction(username : UserNameProps) {

    const jwt = cookies().get("jwt");

    if(jwt == null){
        return null;
    }

    const responseData = await ReadUserByUsernameService(username, jwt.value);
    
    // 서버응답 실패로직
    if (!responseData) {
        console.log('server error', '서버 응답 없음')
        return {
            message: "오류가 발생했습니다. 다시 시도해주세요.",
        };
    }

    // 서버작업 실패로직(서버에서 실패내용을 json으로 return)
    else if (responseData.message) {
        console.log('error', '서버 응답은 있지만 error발생')
        return {
            message: responseData.message,
        };
    }

    else return responseData;
}