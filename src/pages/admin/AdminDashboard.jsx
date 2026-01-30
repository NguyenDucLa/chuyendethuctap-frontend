import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import { getDashboardStats, getRevenueChartData } from '../../services/adminService';
// Import thư viện biểu đồ
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0, totalBookings: 0, totalCourts: 0, totalUsers: 0
    });
    
    // State lưu dữ liệu biểu đồ thật
    const [chartData, setChartData] = useState([]); 
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Gọi song song cả 2 API (Thống kê số + Biểu đồ)
            const [statsData, chartDataResponse] = await Promise.all([
                getDashboardStats(),
                getRevenueChartData()
            ]);
            
            setStats(statsData);
            setChartData(chartDataResponse);
            setLoading(false);
        };
        fetchData();
    }, []);

   
    

    const formatCompactNumber = (number) => {
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            compactDisplay: "short"
        }).format(number);
    };

    const formatVND = (number) => {
        return number.toLocaleString('vi-VN') + 'đ';
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#1a1d20', minHeight: '100vh' }}>
            <AdminSidebar />

            <div className="flex-grow-1 p-4">
                <h2 className="text-white fw-bold mb-4">Tổng Quan Hệ Thống</h2>

                {loading ? (
                    <div className="text-white text-center mt-5"><Spinner animation="border" variant="warning" /></div>
                ) : (
                    <>
                        {/* 4 THẺ THỐNG KÊ */}
                        <Row className="g-4 mb-4">
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

                        {/* --- BIỂU ĐỒ DOANH THU (KHU VỰC TRỐNG LÚC NÃY) --- */}
                        <Card className="border-0 shadow bg-dark text-white border border-secondary">
                            <Card.Header className="bg-transparent border-secondary pt-3">
                                <h5 className="fw-bold text-warning"><i className="bi bi-graph-up-arrow me-2"></i> Biểu đồ doanh thu (Tháng)</h5>
                            </Card.Header>
                            <Card.Body style={{ height: '400px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={chartData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                        <XAxis dataKey="name" stroke="#fff" />
                                        <YAxis stroke="#fff" tickFormatter={(value) => formatCompactNumber(value)} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }}
                                            formatter={(value) => formatVND(value)}
                                        />
                                        <Legend />
                                        <Bar dataKey="doanhThu" name="Doanh thu (VNĐ)" fill="#ffc107" barSize={50} radius={[5, 5, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;