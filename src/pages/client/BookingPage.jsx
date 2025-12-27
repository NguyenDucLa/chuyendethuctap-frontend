import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [court, setCourt] = useState(null);
    const [slots, setSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [userEmail, setUserEmail] = useState(null); // State để lưu email người dùng

    // Load thông tin sân, khung giờ và tên người dùng
    useEffect(() => {
        const fetchData = async () => {
            try {
                const courtRes = await api.getCourtById(id);
                setCourt(courtRes.data);

                const slotRes = await api.getAllTimeSlots();
                setSlots(slotRes.data);

                // Lấy email người dùng từ token
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    setUserEmail(decoded.sub); // 'sub' thường chứa username/email
                }
            } catch (error) {
                toast.error("Lỗi tải dữ liệu!");
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    // Load các slot đã bị đặt
    useEffect(() => {
        const fetchBookedSlots = async () => {
            try {
                const res = await api.checkBookedSlots(id, selectedDate);
                setBookedSlots(res.data);
            } catch (error) {
                console.error("Lỗi lấy slot đã đặt:", error);
            }
        };
        fetchBookedSlots();
    }, [selectedDate, id]);

    const isSlotBooked = (slotId) => {
        return bookedSlots.some(booking => booking.timeSlot && booking.timeSlot.id === slotId);
    };

    const handleBooking = async (slotId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.warning("Vui lòng đăng nhập để đặt sân!");
            navigate('/login');
            return;
        }

        // Lấy thông tin người dùng để hiển thị khi đặt
        const decoded = jwtDecode(token);
        const userEmail = decoded.sub; 

        if (!window.confirm(`Bạn chắc chắn muốn đặt sân ${court.name} vào ngày ${selectedDate} lúc ${slots.find(s => s.id === slotId)?.startTime.substring(0, 5)}?`)) return;

        try {
            await api.post('/bookings', {
                courtId: parseInt(id), // Chuyển sang số
                slotId: slotId,
                date: selectedDate
            });
            toast.success(`Đã đặt sân ${court.name} thành công!`);
            
            // Cập nhật lại trạng thái đã đặt ngay lập tức
            const res = await api.checkBookedSlots(id, selectedDate);
            setBookedSlots(res.data);
            
        } catch (error) {
            toast.error(error.response?.data || "Đặt sân thất bại!");
        }
    };

    if (!court) return <div className="text-center mt-5">Đang tải thông tin sân...</div>;

    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h2 className="text-primary fw-bold">{court.name}</h2>
                    <p className="mb-1">📍 Địa chỉ: {court.address}</p>
                    <p className="text-success fw-bold">💰 Giá: {court.pricePerHour?.toLocaleString()} đ/h</p>
                     {userEmail && <p className="text-muted mb-0">Đã đăng nhập với: {userEmail}</p>}
                </div>
            </div>

            <div className="d-flex align-items-center mb-4">
                <h5 className="me-3 mb-0">📅 Chọn ngày:</h5>
                <input
                    type="date"
                    className="form-control w-auto"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>

            <h5 className="mb-3">⏰ Chọn khung giờ:</h5>
            <div className="row g-3">
                {slots.map((slot) => {
                    const booked = isSlotBooked(slot.id);
                    // Lấy giờ bắt đầu và kết thúc để hiển thị
                    const startTimeStr = slot.startTime.toString().substring(0, 5);
                    const endTimeStr = slot.endTime.toString().substring(0, 5);
                    
                    return (
                        <div className="col-6 col-md-3 col-lg-2" key={slot.id}>
                            <button
                                disabled={booked}
                                onClick={() => handleBooking(slot.id)}
                                className={`btn w-100 py-3 fw-bold ${booked ? 'btn-danger' : 'btn-outline-success'}`}
                            >
                                {startTimeStr} - {endTimeStr}
                                <br />
                                <small style={{ fontSize: '0.8rem' }}>
                                    {booked ? 'Đã Đặt ❌' : 'Còn Trống ✅'}
                                </small>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookingPage;