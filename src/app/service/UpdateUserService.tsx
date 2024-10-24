"use server"

import { cookies } from "next/headers";

const baseUrl = "http://localhost:8080";

export async function UpdateUserService(user :User, Auth :string) {
    console.log(user, "유저정보")

  /** 쿠키 정보 검사 */
  const cookie = cookies().get("jwt")
  if (cookie?.value == null || cookie.value === "null"){
    return "쿠키 정보가 없습니다."
  }

  const url = new URL("/api/admin/updateUser", baseUrl);

  try {
    const response = await fetch(url, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookie.value}`,
      },
      body: JSON.stringify({user, Auth}), /// 이 부분 user와 Auth를 그냥 formData 형식으로 하나로 묶어서 서버로 보내야할듯 (서버에서 두 개의 Body를 받을 수 없음)
    });
    
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } 
      
      else if (contentType && contentType.includes("text/plain")) {
        return await response.text();
      } 
      
      else {
        return response;
      }
    
    } catch (error) {
    console.error("Registration Service Error:", error);
    return null;
  }

}