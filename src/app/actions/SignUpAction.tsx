"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignUpService } from "../service/SignUpService";

 /* cookie config 설정 */
const config = { 
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "13.124.150.61",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.PROTOCOL === "https",
  };

 /* zod 설정 */
 const schemaRegister = z.object({
  id: z.string()
    .min(3, { message: "아이디는 3글자 이상이어야 합니다." })
    .max(20, { message: "아이디는 20글자 이하여야 합니다." }),
  name: z.string()
    .min(2, { message: "이름은 2글자 이상이어야 합니다." })
    .max(20, { message: "이름은 20글자 이하여야 합니다." }),
  password: z.string()
    .min(6, { message: "비밀번호는 6글자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20글자 이하여야 합니다." }),
  adress: z.string()
    .min(3, { message: "주소를 입력해주세요." }),
  email: z.string().email({ message: "올바른 이메일 주소를 입력해주세요." })
  .optional().default('not@email.com'),
  number: z.string() // formData는 가져온 숫자를 문자열로 변환하기에 z.string()으로 처리
    .min(3, { message: "연락처를 입력해주세요." })
});

 /* 회원가입 action */
export async function SignUpAction(prevState: any, formData: FormData) {

  // 입력받은 연락처 조합
  const number1 = formData.get("number1") as string | null;
  const number2 = formData.get("number2") as string | null;
  const number3 = formData.get("number3") as string | null;
  const number = number1 && number2 && number3 ? number1 + number2 + number3 : "";

  // zod 검사
  const validatedFields = schemaRegister.safeParse({
    id: formData.get("id"),
    password: formData.get("password"),
    email: formData.get("email"),
    name: formData.get("name"),
    number: number,
    adress: formData.get("adress"),
  });

  if (!validatedFields.success) { 
    return {
     ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors, 
    };
  }
  
  const responseData = await SignUpService(validatedFields.data);

  if (!responseData) {
    console.log('here error', '서버 응답 없음')
    return {
      ...prevState,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.message) {
    console.log('here error2', '서버 응답은 있지만 error발생')
    return {
      ...prevState,
      message: responseData.message,
    };
  }

}