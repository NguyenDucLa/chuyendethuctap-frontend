import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import { getDashboardStats } from '../../services/adminService'; // Import

const AdminDashboard = () => {
    // State lưu dữ liệu thật
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalBookings: 0,
        totalCourts: 0,
        totalUsers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getDashboardStats();
            setStats(data);
        };
        fetchStats();
    }, []);

    // Hàm format tiền cho gọn (Ví dụ: 1500000 -> 1.5M, 200000 -> 200k)
    const formatCompactNumber = (number) => {
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            compactDisplay: "short"
        }).format(number);
    };

    // Hàm format tiền chuẩn VNĐ (để hiển thị tooltip nếu cần)
    const formatVND = (number) => {
        return number.toLocaleString('vi-VN') + 'đ';
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#1a1d20', minHeight: '100vh' }}>
            <AdminSidebar />

            <div className="flex-grow-1 p-4">
                <h2 className="text-white fw-bold mb-4">Tổng Quan Hệ Thống</h2>

                <Row className="g-4 mb-5">
                    {/* DOANH THU */}
                    <Col md={3}>
                        <Card className="border-0 shadow text-dark" style={{ background: 'linear-gradient(45deg, #ffc107, #ff9800)' }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase opacity-75 fw-bold">Tổng doanh thu</h6>
                                        <h3 className="fw-bold" title={formatVND(stats.totalRevenue)}>
                                            {formatCompactNumber(stats.totalRevenue)}
                                        </h3>
                                    </div>
                                    <i className="bi bi-currency-dollar fs-1 opacity-50"></i>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* SỐ ĐƠN ĐẶT */}
                    <Col md={3}>
                        <Card className="border-0 shadow text-white" style={{ background: 'linear-gradient(45deg, #0dcaf0, #0d6efd)' }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase opacity-75 fw-bold">Số đơn đặt</h6>
                                        <h3 className="fw-bold">{stats.totalBookings}</h3>
                                    </div>
                                    <i className="bi bi-journal-bookmark fs-1 opacity-50"></i>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* SÂN HOẠT ĐỘNG */}
                    <Col md={3}>
                        <Card className="border-0 shadow text-white" style={{ background: 'linear-gradient(45deg, #198754, #20c997)' }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase opacity-75 fw-bold">Sân hoạt động</h6>
                                        <h3 className="fw-bold">{stats.totalCourts}</h3>
                                    </div>
                                    <i className="bi bi-dribbble fs-1 opacity-50"></i>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* KHÁCH HÀNG */}
                    <Col md={3}>
                        <Card className="border-0 shadow text-white" style={{ background: 'linear-gradient(45deg, #dc3545, #fd7e14)' }}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-uppercase opacity-75 fw-bold">Khách hàng</h6>
                                        <h3 className="fw-bold">{stats.totalUsers}</h3>
                                    </div>
                                    <i className="bi bi-people fs-1 opacity-50"></i>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Card className="border-0 shadow bg-dark text-white border border-secondary">
                    <Card.Body style={{ height: '400px' }} className="d-flex align-items-center justify-content-center">
                        <span className="text-muted">Khu vực biểu đồ thống kê (Phát triển sau)</span>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;