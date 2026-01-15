import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getUserProfile } from '../../services/userService';
import { getBookingHistory } from '../../services/courtService'; // Tái sử dụng hàm này

const DashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ totalBookings: 0, totalSpent: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                navigate('/login');
                return;
            }

            try {
                // Gọi song song 2 API: Lấy Info và Lấy Lịch Sử
                const [userData, historyData] = await Promise.all([
                    getUserProfile(userId),
                    getBookingHistory(userId)
                ]);

                setUser(userData);

                // Tính toán thống kê
                const totalSpent = historyData.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
                const pendingCount = historyData.filter(item => item.status === 'PENDING').length;

                setStats({
                    totalBookings: historyData.length,
                    totalSpent: totalSpent,
                    pending: pendingCount
                });

            } catch (error) {
                console.error("Lỗi tải dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) return <div className="text-white text-center mt-5"><Spinner animation="border" variant="warning" /></div>;

    return (
        <div style={{ backgroundColor: '#1a1d20', minHeight: '100vh', paddingBottom: '50px' }}>
            <Container className="py-5">
                <Row>
                    {/* --- CỘT TRÁI: THÔNG TIN CÁ NHÂN --- */}
                    <Col md={4} className="mb-4">
                        <Card className="border-0 shadow-lg h-100" style={{ backgroundColor: '#2c3035' }}>
                            <Card.Body className="text-center p-4 text-white">
                                {/* Avatar to */}
                                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold shadow"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#dc3545', fontSize: '40px' }}>
                                    {user?.fullName?.charAt(0).toUpperCase()}
                                </div>

                                <h4 className="fw-bold mb-1">{user?.fullName}</h4>
                                <Badge bg="warning" text="dark" className="mb-3">Thành viên thân thiết</Badge>

                                <div className="text-start mt-4 px-3">
                                    <p className="text-white-50 mb-2"><i className="bi bi-envelope-fill me-2 text-warning"></i> {user?.email}</p>
                                    <p className="text-white-50 mb-2"><i className="bi bi-telephone-fill me-2 text-warning"></i> {user?.phone || 'Chưa cập nhật'}</p>
                                    <p className="text-white-50 mb-4"><i className="bi bi-geo-alt-fill me-2 text-warning"></i>{user?.address || 'Chưa cập nhật địa chỉ'}</p>
                                </div>

                                <div className="d-grid gap-2">
                                    {/* Sửa dòng này: Thêm as={Link} to="/settings" */}
                                    <Button as={Link} to="/settings" variant="outline-light" className="rounded-pill">
                                        Chỉnh sửa hồ sơ
                                    </Button>

                                    {/* Sửa dòng này luôn cho tiện */}
                                    <Button as={Link} to="/settings" variant="outline-danger" className="rounded-pill">
                                        Đổi mật khẩu
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* --- CỘT PHẢI: THỐNG KÊ & HOẠT ĐỘNG --- */}
                    <Col md={8}>
                        {/* 1. CARDS THỐNG KÊ */}
                        <Row className="mb-4">
                            <Col md={4} className="mb-3">
                                <Card className="border-0 shadow h-100" style={{ background: 'linear-gradient(45deg, #ffc107, #ffdb4d)' }}>
                                    <Card.Body className="text-dark">
                                        <h6 className="fw-bold text-uppercase opacity-75">Tổng lượt đặt</h6>
                                        <h2 className="fw-bold display-5 mb-0">{stats.totalBookings}</h2>
                                        <small><i className="bi bi-arrow-up-right"></i> Rất tích cực!</small>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-3">
                                <Card className="border-0 shadow h-100" style={{ background: 'linear-gradient(45deg, #198754, #20c997)' }}>
                                    <Card.Body className="text-white">
                                        <h6 className="fw-bold text-uppercase opacity-75">Tổng chi tiêu</h6>
                                        <h2 className="fw-bold mb-0">{(stats.totalSpent / 1000).toFixed(0)}k</h2>
                                        <small>VNĐ</small>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-3">
                                <Card className="border-0 shadow h-100" style={{ background: 'linear-gradient(45deg, #0dcaf0, #39d2f2)' }}>
                                    <Card.Body className="text-dark">
                                        <h6 className="fw-bold text-uppercase opacity-75">Điểm tích lũy</h6>
                                        <h2 className="fw-bold display-5 mb-0">{Math.floor(stats.totalSpent / 10000)}</h2>
                                        <small>Điểm thưởng</small>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* 2. MENU NHANH */}
                        <Card className="border-0 shadow-lg text-white" style={{ backgroundColor: '#2c3035' }}>
                            <Card.Body className="p-4">
                                <h5 className="fw-bold mb-4 border-start border-4 border-warning ps-3">Truy cập nhanh</h5>
                                <Row className="g-3">
                                    <Col sm={6}>
                                        <Button as={Link} to="/history" variant="dark" className="w-100 py-3 text-start border border-secondary hover-bg-warning">
                                            <i className="bi bi-clock-history me-3 text-warning fs-4"></i>
                                            <span className="fs-6">Xem lịch sử đặt sân</span>
                                        </Button>
                                    </Col>
                                    <Col sm={6}>
                                        <Button as={Link} to="/courts" variant="dark" className="w-100 py-3 text-start border border-secondary hover-bg-warning">
                                            <i className="bi bi-plus-circle-dotted me-3 text-success fs-4"></i>
                                            <span className="fs-6">Đặt sân mới</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .hover-bg-warning:hover { background-color: #444 !important; border-color: #ffc107 !important; }
            `}</style>
        </div>
    );
};

export default DashboardPage;