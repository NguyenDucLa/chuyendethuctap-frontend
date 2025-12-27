import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Thêm hàm getCourtById
api.getCourtById = (id) => api.get(`/courts/${id}`);
// Thêm hàm getAllCourts (nếu chưa có)
api.getAllCourts = () => api.get('/courts');
// Thêm hàm getAllTimeSlots
api.getAllTimeSlots = () => api.get('/bookings/slots');
// Thêm hàm checkBookedSlots
api.checkBookedSlots = (courtId, date) => api.get(`/bookings/check?courtId=${courtId}&date=${date}`);

api.getMyBookings = () => api.get('/bookings/my-bookings');

api.getAllBookings = () => api.get('/bookings'); // Gọi API lấy tất cả
api.deleteBooking = (id) => api.delete(`/bookings/${id}`); // Gọi API hủy

api.register = (data) => api.post('/auth/register', data);

export default api;