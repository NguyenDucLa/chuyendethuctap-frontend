import axios from 'axios';

const API_URL = "http://localhost:8080/api/admin";

export const getDashboardStats = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/stats`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy thống kê:", error);
        return { totalRevenue: 0, totalBookings: 0, totalCourts: 0, totalUsers: 0 };
    }
};