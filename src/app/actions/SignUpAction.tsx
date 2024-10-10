"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IdCheckService, SignUpService } from "../service/SignUpService";

 /* cookie config 설정 */
const config = { 
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "13.124.150.61",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.PROTOCOL === "https",
  };

/* 회원가입 action */
export async function SignUpAction(prevState: any, formData: FormData) {

  // zod 설정 
  const schemaRegister = z.object({
   username: z.string()
     .min(3, { message: "아이디는 3글자 이상이어야 합니다." })
     .max(20, { message: "아이디는 20글자 이하여야 합니다." }),
   name: z.string()
     .min(2, { message: "이름은 2글자 이상이어야 합니다." })
     .max(20, { message: "이름은 20글자 이하여야 합니다." }),
   password: z.string()
     .min(6, { message: "비밀번호는 6글자 이상이어야 합니다." })
     .max(20, { message: "비밀번호는 20글자 이하여야 합니다." }),
   address: z.string()
     .min(3, { message: "주소를 입력해주세요." }),
   email: z.string().email({ message: "올바른 이메일 주소를 입력해주세요." })
   .optional().default('not@email.com'),
   number: z.string() // formData는 가져온 숫자를 문자열로 변환하기에 z.string()으로 처리
     .min(3, { message: "연락처를 입력해주세요." })
  });

  // 입력받은 연락처 조합
  const number1 = formData.get("number1") as string | null;
  const number2 = formData.get("number2") as string | null;
  const number3 = formData.get("number3") as string | null;
  const number = number1 && number2 && number3 ? number1 + number2 + number3 : "";

  // zod 검사
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("id"), // 서버로 보낼 때 id 값을 username이라는 값으로 사용하기 위해 username 객체에 매치
    password: formData.get("password"),
    email: formData.get("email"),
    name: formData.get("name"),
    number: number,
    address: formData.get("address"),
  });

  // zod 검사 실패 로직
  if (!validatedFields.success) { 
    return {
     ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors, 
    };
  }
  
  // 서버통신 함수에 값 전달(zod 통과 시)
  const responseData = await SignUpService(validatedFields.data);

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


/* 아이디 중복체크 Action */
export async function IdCheckAction(userID: any) {

  // zod 설정
  const schemaRegister = z.object({
    username: z.string()
      .min(3, { message: "아이디는 3글자 이상이어야 합니다." })
      .max(20, { message: "아이디는 20글자 이하여야 합니다." })
  });

  // zod 검사
  const validatedFields = schemaRegister.safeParse({
    username: userID
  })

  // zod 실패 로직
  if (!validatedFields.success) { 
    return {
      message: "아이디는 3글자 이상 20글자 이하입니다.", 
    };
  }

  // 서버통신 함수에 값 전달(zod 통과 시)
  console.log(userID,"유저 id")
  const responseData = await IdCheckService(validatedFields.data);


  if (!responseData) {
    console.log('server error', '서버 응답 없음')
    return {
      message: "오류가 발생했습니다. 다시 시도해주세요.",
    };
  }

  else if (responseData.message) {
    console.log('error', '서버 응답은 있지만 error발생')
    return {
      message: responseData.message,
    };
  }
  return {
    message: responseData,
  };

}