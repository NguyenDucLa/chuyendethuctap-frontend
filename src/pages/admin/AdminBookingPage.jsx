import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminBookingPage = () => {
    const [bookings, setBookings] = useState([]);

    // Hàm load dữ liệu
    const fetchBookings = async () => {
        try {
            const res = await api.getAllBookings();
            setBookings(res.data);
        } catch (error) {
            toast.error("Lỗi tải danh sách đơn!");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Hàm hủy đơn
    const handleDelete = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn hủy đơn đặt này của khách?")) {
            try {
                await api.deleteBooking(id);
                toast.success("Đã hủy đơn!");
                fetchBookings(); // Load lại bảng
            } catch (error) {
                toast.error("Hủy thất bại!");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-danger fw-bold border-bottom pb-2">⚙️ Quản Lý Tất Cả Lịch Đặt</h2>
            
            <div className="card shadow-sm border-0 mt-3">
                <table className="table table-striped table-hover mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>Sân bóng</th>
                            <th>Ngày đá</th>
                            <th>Khung giờ</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <span className="fw-bold">{item.user?.fullName || "Unknown"}</span>
                                    <br/>
                                    <small className="text-muted">{item.user?.email}</small>
                                </td>
                                <td className="text-primary fw-bold">{item.court?.name}</td>
                                <td>{item.bookingDate}</td>
                                <td>
                                    <span className="badge bg-warning text-dark">
                                        {item.timeSlot?.startTime.substring(0, 5)} - {item.timeSlot?.endTime.substring(0, 5)}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Hủy Đơn
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBookingPage;