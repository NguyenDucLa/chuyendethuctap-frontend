import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getBookingHistory, cancelBooking } from '../../services/courtService'; // Import thêm cancelBooking

const BookingHistoryPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm load dữ liệu
    const fetchHistory = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Vui lòng đăng nhập để xem lịch sử!");
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const data = await getBookingHistory(userId);
            const sortedData = data.sort((a, b) => b.id - a.id);
            setBookings(sortedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [navigate]);

    // XỬ LÝ HỦY ĐƠN
    const handleCancel = async (bookingId) => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đơn đặt sân này không?")) {
            try {
                await cancelBooking(bookingId);
                alert("Đã hủy đơn thành công!");
                fetchHistory(); // Load lại danh sách để cập nhật trạng thái mới
            } catch (error) {
                alert("Lỗi khi hủy đơn. Vui lòng thử lại.");
            }
        }
    };

    const formatCurrency = (amount) => {
        return amount ? amount.toLocaleString() + 'đ' : '0đ';
    };

    const renderStatus = (status) => {
        if (status === 'CONFIRMED') return <Badge bg="success">Thành công</Badge>;
        if (status === 'PENDING') return <Badge bg="warning" text="dark">Chờ duyệt</Badge>;
        if (status === 'CANCELLED') return <Badge bg="danger">Đã hủy</Badge>;
        return <Badge bg="secondary">{status}</Badge>;
    };

    return (
        <div style={{ backgroundColor: '#1a1d20', minHeight: '100vh', paddingBottom: '50px' }}>
            <Container className="py-5">
                <h2 className="text-white fw-bold mb-4 text-uppercase border-start border-4 border-warning ps-3">
                    Lịch sử đặt sân
                </h2>

                {loading ? (
                    <div className="text-center text-white">Đang tải dữ liệu...</div>
                ) : bookings.length > 0 ? (
                    <Card className="border-0 shadow-lg" style={{ backgroundColor: '#2c3035' }}>
                        <Card.Body className="p-0">
                            <Table hover responsive variant="dark" className="mb-0 text-center align-middle">
                                <thead className="bg-dark text-warning">
                                    <tr>
                                        <th className="py-3">Mã đơn</th>
                                        <th className="py-3 text-start">Sân bóng</th>
                                        <th className="py-3">Ngày đá</th>
                                        <th className="py-3">Khung giờ</th>
                                        <th className="py-3">Tổng tiền</th>
                                        <th className="py-3">Trạng thái</th>
                                        <th className="py-3">Thao tác</th> {/* Thêm cột này */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((item) => (
                                        <tr key={item.id}>
                                            <td className="fw-bold text-white-50">#{item.id}</td>
                                            <td className="text-start">
                                                <div className="fw-bold text-white">{item.court?.name}</div>
                                                <small className="text-white-50">{item.court?.location}</small>
                                            </td>
                                            <td>{item.bookingDate}</td>
                                            <td>
                                                <Badge bg="info" text="dark" className="fs-6">
                                                    {item.startTime}h - {item.endTime}h
                                                </Badge>
                                            </td>
                                            <td className="fw-bold text-warning">{formatCurrency(item.totalPrice)}</td>
                                            <td>{renderStatus(item.status)}</td>
                                            
                                            {/* CỘT THAO TÁC */}
                                            <td>
                                                {/* Chỉ hiện nút Hủy nếu trạng thái KHÁC Cancelled */}
                                                {item.status !== 'CANCELLED' ? (
                                                    <Button 
                                                        variant="outline-danger" 
                                                        size="sm" 
                                                        className="rounded-pill px-3"
                                                        onClick={() => handleCancel(item.id)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                ) : (
                                                    <span className="text-white-50 small">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                ) : (
                    <div className="text-center py-5 bg-dark rounded border border-secondary">
                        <i className="bi bi-calendar-x text-white-50" style={{ fontSize: '4rem' }}></i>
                        <h4 className="text-white mt-3">Bạn chưa có đơn đặt sân nào</h4>
                        <Button as={Link} to="/courts" variant="warning" className="mt-3 fw-bold rounded-pill">
                            Đặt sân ngay
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default BookingHistoryPage;