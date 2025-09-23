const API_BASE_URL = "http://backend:8090";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      // Try JSON parse, else return plain text
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // ✅ Signup
  async signUp(userData) {
    return this.request("/users/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  // ✅ Signin
  async signIn(email, password) {
    return this.request("/users/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // ✅ Forgot Password (sends recovery mail)
  async forgotPassword(email) {
    return this.request(`/users/forgotpassword/${encodeURIComponent(email)}`, {
      method: "GET",
    });
  }

  // ✅ Get Full Name (needs csrid)
  async getFullName(csrid) {
    return this.request("/users/fullname", {
      method: "POST",
      body: JSON.stringify({ csrid }),
    });
  }
}

export default new ApiService();
