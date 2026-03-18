import axios from 'axios';

//const API_URL = "https://booking-backend-ipxm.onrender.com/api/contacts";
const API_URL = "http://localhost:8080/api/contacts";

// Gửi liên hệ
export const sendContact = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy danh sách liên hệ (Cho Admin)
export const getAllContacts = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return [];
    }
};