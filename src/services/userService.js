import axios from 'axios';

//const API_URL = "https://booking-backend-ipxm.onrender.com/api/users";
const API_URL = "http://localhost:8080/api/users";

// 1. Lấy thông tin user (Private - Cần Token)
export const getUserProfile = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
        throw error;
    }
};

// 2. Cập nhật thông tin (Private - Cần Token)
export const updateUserProfile = async (userId, data) => {
    try {
        const token = localStorage.getItem("token");
        // Lưu ý: Với PUT, tham số thứ 3 mới là headers
        const response = await axios.put(`${API_URL}/${userId}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 3. Đổi mật khẩu (Private - Cần Token)
export const changePassword = async (userId, data) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/${userId}/password`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : "Lỗi server";
    }
};

// 4. Lấy tất cả user (Admin)
export const getAllUsers = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy danh sách user:", error);
        return [];
    }
};

// 5. Xóa user (Admin)
export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return true;
    } catch (error) {
        throw error;
    }
};