import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const BookingHistoryPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.getMyBookings();
                setBookings(res.data);
            } catch (error) {
                toast.error("Lỗi tải lịch sử!");
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-primary fw-bold mb-4">📜 Lịch Sử Đặt Sân Của Tôi</h2>

            {bookings.length === 0 ? (
                <div className="text-center mt-5">
                    <p className="text-muted">Bạn chưa đặt sân nào cả.</p>
                    <Link to="/" className="btn btn-primary">Đặt sân ngay</Link>
                </div>
            ) : (
                <div className="card shadow-sm border-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Mã đơn</th>
                                <th>Sân bóng</th>
                                <th>Ngày đá</th>
                                <th>Khung giờ</th>
                                <th>Giá tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((item) => (
                                <tr key={item.id}>
                                    <td>#{item.id}</td>
                                    <td className="fw-bold text-primary">{item.court.name}</td>
                                    <td>{item.bookingDate}</td>
                                    <td>
                                        <span className="badge bg-info text-dark">
                                            {item.timeSlot.startTime.substring(0, 5)} - {item.timeSlot.endTime.substring(0, 5)}
                                        </span>
                                    </td>
                                    <td className="fw-bold">{item.court.pricePerHour.toLocaleString()} đ</td>
                                    <td>
                                        {item.status === 'CONFIRMED' ? (
                                            <span className="badge bg-success">Thành công</span>
                                        ) : (
                                            <span className="badge bg-warning">Chờ duyệt</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookingHistoryPage;