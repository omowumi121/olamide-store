export const createAuthApi = (baseUrl: string) => {
  const cleanUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  return {
    loginRequest: async (data: any) => {
      const res = await fetch(`${cleanUrl}/login`,
         {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("SDK Error: Server returned HTML. Check your baseUrl.");
      }

      const result = await res.json();

      if (!res.ok) {
        // Specifically look for error messages from the Go backend
        throw new Error(result.message || result.error || "Login failed");
      }

      return result; 
    },

    registerRequest: async (data: any) => {
      const res = await fetch(`${cleanUrl}/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("SDK Error: Server returned HTML instead of JSON.");
      }

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || result.error || "Registration failed");
      }
      
      return result;
    },
  };
};