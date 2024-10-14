const baseUrl = "http://localhost:8080";

/* refreshToken으로 액세스 토큰 발급 로직 */
export async function refreshTokenService(refreshTokenValue: String | undefined) {

  // refreshTokenValue가 없을 경우 처리
  if (!refreshTokenValue) { 
    console.error("Refresh token is undefined");
    return null;
  }

  const url = new URL("/api/refreshToken", baseUrl);
  
  try {
    const response = await fetch(url, { 

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token : refreshTokenValue }),
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

/* refreshToken 삭제 로직 */
export async function DeleterefreshTokenService(refreshTokenValue: String | undefined) {

  // refreshTokenValue이 없을 경우 처리
  if (!refreshTokenValue) { 
    console.error("Refresh token is undefined");
    return null;
  }

  const url = new URL("/api/DeleterefreshToken", baseUrl);
  
  try {
    const response = await fetch(url, { 

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token : refreshTokenValue }),
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