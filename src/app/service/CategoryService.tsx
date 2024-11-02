"use server"

import { cookies } from "next/headers";

const baseUrl = "http://localhost:8080";

export async function ReadlgCategoryService() {

  /** 쿠키 정보 검사 */
  const cookie = cookies().get("jwt")
  if (cookie?.value == null || cookie.value === "null"){
    return "쿠키 정보가 없습니다."
  }

  /** 서버 통신 */
  const url = new URL("/api/admin/ReadlgCategoryList", baseUrl);

  try {
    const response = await fetch(url, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookie.value}`,
      },
      body: JSON.stringify({}),
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