const baseUrl = "http://localhost:8080";

export async function refreshTokenService(refreshTokenValue: String | undefined) {

  // refreshTokenValue이 없을 경우 처리
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