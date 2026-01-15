import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllBookings, cancelBooking } from '../../services/courtService';
import { toast } from 'react-toastify';

const AdminBookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getAllBookings();
        setBookings(data);
        setFilteredBookings(data);
    };

    // Hàm xử lý tìm kiếm (Tìm theo Tên khách hoặc Mã đơn)
    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearch(keyword);
        const filtered = bookings.filter(b => 
            b.user?.fullName.toLowerCase().includes(keyword) || 
            b.id.toString().includes(keyword)||
            b.user?.phone && b.user.phone.includes(keyword)
        );
        setFilteredBookings(filtered);
    };

    // Hàm Hủy đơn (Admin quyền lực)
    const handleCancel = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
            try {
                await cancelBooking(id);
                toast.success("Đã hủy đơn thành công!");
                fetchData(); // Load lại dữ liệu
            } catch (error) {
                toast.error("Lỗi khi hủy đơn.");
            }
        }
    };

    // Render trạng thái màu mè
    const renderStatus = (status) => {
        if (status === 'CONFIRMED') return <Badge bg="success">Thành công</Badge>;
        if (status === 'PENDING') return <Badge bg="warning" text="dark">Chờ thanh toán</Badge>;
        if (status === 'CANCELLED') return <Badge bg="danger">Đã hủy</Badge>;
        return <Badge bg="secondary">{status}</Badge>;
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#1a1d20', minHeight: '100vh' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-white fw-bold">Quản Lý Đặt Lịch</h2>
                    
                    {/* Ô tìm kiếm đơn hàng */}
                    <div style={{ width: '300px' }}>
                        <InputGroup>
                            <InputGroup.Text className="bg-dark text-secondary border-secondary">
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control 
                                placeholder="Tìm theo tên, SĐT hoặc mã đơn..." 
                                className="bg-dark text-white border-secondary"
                                value={search}
                                onChange={handleSearch}
                            />
                        </InputGroup>
                    </div>
                </div>

                <div className="bg-dark rounded shadow overflow-hidden">
                    <Table hover variant="dark" className="mb-0 align-middle text-center">
                        <thead className="bg-secondary text-warning">
                            <tr>
                                <th>ID</th>
                                <th className="text-start">Khách hàng</th>
                                <th className="text-start">Thông tin sân</th>
                                <th>Thời gian</th>
                                <th>Thanh toán</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-white-50">#{item.id}</td>
                                    <td className="text-start fw-bold">
                                        {item.user?.fullName}
                                        <div className="small text-white-50 fw-normal">{item.user?.phone}</div>
                                    </td>
                                    <td className="text-start">
                                        {item.court?.name}
                                        <div className="small text-white-50">{item.court?.location}</div>
                                    </td>
                                    <td>
                                        <div className="fw-bold">{item.bookingDate}</div>
                                        <Badge bg="light" text="dark" className="mt-1">
                                            {item.startTime}h - {item.endTime}h
                                        </Badge>
                                    </td>
                                    <td>
                                        {item.paymentMethod === 'VNPAY' ? (
                                            <Badge bg="primary">VNPAY</Badge>
                                        ) : (
                                            <Badge bg="secondary">Tiền mặt</Badge>
                                        )}
                                    </td>
                                    <td className="text-warning fw-bold">
                                        {item.totalPrice?.toLocaleString()}đ
                                    </td>
                                    <td>{renderStatus(item.status)}</td>
                                    <td>
                                        {item.status !== 'CANCELLED' && (
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                onClick={() => handleCancel(item.id)}
                                                title="Hủy đơn này"
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    
                    {filteredBookings.length === 0 && (
                        <div className="text-center py-5 text-white-50">
                            Không tìm thấy đơn đặt nào.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminBookingPage;