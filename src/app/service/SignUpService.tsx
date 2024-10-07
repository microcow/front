const baseUrl = "http://localhost:8080";

export async function SignUpService(userData: any) {
    console.log(userData, "유저데이터")

  const url = new URL("/api/SignUp", baseUrl);
  try {
    const response = await fetch(url, { 
    
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return response;
     }
    
    } catch (error) {
    console.error("Registration Service Error:", error);
    return null;
  }
}