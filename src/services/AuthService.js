import { API_BASE_URL } from '../config/config';

class AuthService {
    async login(username, password) {
    // Mock response for testing
    if (username === 'wahid.ali@gmail.com' && password === 'Password@123') {
      const mockData = {
        success: true,
        message: "Login successful",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        tokenType: "Bearer",
        expiresIn: 86400,
        user: {
          id: "user-uuid-001",
          name: "Wahid Ali",
          email: "wahid.ali@gmail.com",
          mobile: "9876543210",
          role: "FARMER"
        },
        redirect: "/dashboard"
      };
      localStorage.setItem("token", mockData.token);
      return { success: true, user: mockData.user, redirect: mockData.redirect };
    } else {
      return { success: false, message: "Invalid email or password" };
    }

    // Uncomment below for real API call when backend is ready
    /*
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        return { success: true, user: data.user, redirect: data.redirect };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred during login" };
    }
    */
  }

  async logout() {
    localStorage.removeItem("token");
    // Additional logout logic if needed
  }
}

export default AuthService;
