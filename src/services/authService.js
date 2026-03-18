import axios from 'axios';

//const API_URL = "https://booking-backend-ipxm.onrender.com/api/auth";
const API_URL = "http://localhost:8080/api/auth";

// Hàm đăng ký
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Hàm đăng nhập
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Hàm đăng xuất
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId"); // Xóa luôn cả userId cho sạch
    window.location.href = "/login"; 
};