"use server"

import { cookies } from "next/headers";

const baseUrl = "http://localhost:8080";

export async function DeleteUserService(username :string) {

  /** 쿠키 정보 검사 */
  const cookie = cookies().get("jwt")
  if (cookie?.value == null || cookie.value === "null"){
    return "쿠키 정보가 없습니다."
  }

  /** username 검사 */
  else if (username == null || username === "null"){
    return "유저 정보가 없습니다."
  }

  const url = new URL("/api/admin/deleteUser", baseUrl);
  
  try {
    const response = await fetch(url, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookie.value}`,
      },
      body: JSON.stringify({username}),
    });
    
      const contentType = response.headers.get("Content-Type");
      
      if (contentType && contentType.includes("text/plain")) {
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