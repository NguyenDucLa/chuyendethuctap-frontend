import axios from 'axios';
// Thay thế đoạn đầu bằng:
const API_URL = "https://booking-backend-ipxm.onrender.com/api/courts";
const BOOKING_URL = "https://booking-backend-ipxm.onrender.com/api/bookings";
const CATEGORY_API_URL = "https://booking-backend-ipxm.onrender.com/api/categories";
const CHAT_URL = "https://booking-backend-ipxm.onrender.com/api/chat";

// const API_URL = "http://localhost:8080/api/courts";
// const BOOKING_URL = "http://localhost:8080/api/bookings";
// const CATEGORY_API_URL = "http://localhost:8080/api/categories";
// const CHAT_URL = "http://localhost:8080/api/chat"; 

// --- PHẦN 1: PUBLIC (Ai cũng gọi được) ---

// 1. Lấy tất cả sân (Có hỗ trợ lọc theo categoryId)
export const getAllCourts = async (categoryId = null) => {
    try {
        let url = API_URL;
        if (categoryId) {
            url = `${API_URL}?categoryId=${categoryId}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy sân:", error);
        return [];
    }
};

// 2. Lấy danh mục (SỬA: Dùng CATEGORY_API_URL)
export const getAllCategories = async () => {
    try {
        const response = await axios.get(CATEGORY_API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy danh mục:", error);
        return [];
    }
};

// 3. Tìm kiếm
export const searchCourts = async (keyword) => {
    try {
        const response = await axios.get(`${API_URL}/search?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

// 4. Top sân
export const getTopCourts = async () => {
    try {
        const response = await axios.get(`${API_URL}/top`);
        return response.data;
    } catch (error) {
        return [];
    }
};

// 5. Chi tiết sân
export const getCourtById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 6. Kiểm tra lịch đã đặt
export const getBookedSlots = async (courtId, date) => {
    try {
        const response = await axios.get(`${BOOKING_URL}/check?courtId=${courtId}&date=${date}`);
        return response.data; 
    } catch (error) {
        console.error("Lỗi check lịch:", error);
        return [];
    }
};

// --- PHẦN 2: PRIVATE (Cần Token - User & Admin) ---

// 7. Tạo đơn đặt sân
export const createBooking = async (bookingData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(BOOKING_URL, bookingData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 8. Lấy lịch sử đặt sân
export const getBookingHistory = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BOOKING_URL}/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy lịch sử:", error);
        return [];
    }
};

// 9. Hủy đặt sân
export const cancelBooking = async (bookingId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${BOOKING_URL}/cancel/${bookingId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// --- PHẦN 3: ADMIN ONLY (Thêm, Sửa, Xóa Sân) ---

// 10. Xóa sân
export const deleteCourt = async (courtId) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/${courtId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return true;
    } catch (error) {
        throw error;
    }
};

// 11. Thêm sân mới
export const createCourt = async (courtData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(API_URL, courtData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 12. Cập nhật sân
export const updateCourt = async (id, courtData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/${id}`, courtData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 13. Lấy tất cả booking (Admin)
export const getAllBookings = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BOOKING_URL}/all`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy danh sách booking:", error);
        return [];
    }
};

// --- CATEGORY API (ADMIN) ---

// 14. Thêm danh mục (SỬA: Dùng CATEGORY_API_URL)
export const createCategory = async (categoryData) => {
    try {
        const token = localStorage.getItem("token");
        // Dùng đúng biến CATEGORY_API_URL đã khai báo ở trên
        await axios.post(CATEGORY_API_URL, categoryData, { 
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        throw error;
    }
};

// 15. Sửa danh mục (SỬA: Dùng CATEGORY_API_URL)
export const updateCategory = async (id, categoryData) => {
    try {
        const token = localStorage.getItem("token");
        await axios.put(`${CATEGORY_API_URL}/${id}`, categoryData, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        throw error;
    }
};

// 16. Xóa danh mục (SỬA: Dùng CATEGORY_API_URL)
export const deleteCategory = async (id) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${CATEGORY_API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        throw error;
    }
};

// --- CHATBOT API ---
// Nếu đang test ở máy thì dùng localhost, nếu up lên mạng thì đổi thành link Render


export const sendMessageToBot = async (message) => {
    try {
        const response = await axios.post(CHAT_URL, { message });
        return response.data.reply;
    } catch (error) {
        console.error("Lỗi chat:", error);
        return "Xin lỗi, hệ thống đang bận hoặc mất kết nối. Vui lòng thử lại sau.";
    }
};