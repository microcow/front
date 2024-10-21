const baseUrl = "http://localhost:8080";

export async function ReadUserListService() {

  const url = new URL("/api/readUserList", baseUrl);
  
  try {
    const response = await fetch(url, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export async function ReadUserByUsernameService(username : UserNameProps, jwt : string) {

  const url = new URL("/api/admin/readUserByUsername", baseUrl);
  
  try {
    const response = await fetch(url, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify(username),
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