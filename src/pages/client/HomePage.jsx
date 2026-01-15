import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTopCourts } from '../../services/courtService'; // Import hàm gọi API

const HomePage = () => {
    // State để lưu danh sách sân nổi bật
    const [topCourts, setTopCourts] = useState([]);

    // Gọi API ngay khi trang load
    useEffect(() => {
        const fetchTopData = async () => {
            const data = await getTopCourts();
            setTopCourts(data);
        };
        fetchTopData();
    }, []);

    return (
        <div className="homepage-wrapper">
            {/* 1. HERO SECTION - BANNER */}
            <div style={{
                background: 'linear-gradient(135deg, #212529 0%, #343a40 100%)',
                minHeight: '350px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                marginTop: '-1px'
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 193, 7, 0.05) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }}></div>

                <Container style={{ position: 'relative', zIndex: 2 }}>
                    <Row className="justify-content-center text-center">
                        <Col md={10} lg={8}>
                            <h1 className="fw-bold mb-3 display-5 text-uppercase">
                                HỆ THỐNG ĐẶT SÂN BÓNG <span className="text-warning text-nowrap">SỐ 1</span>
                            </h1>
                            <p className="fs-6 mb-4 text-white-50 px-3">
                                Trải nghiệm đặt sân chuyên nghiệp - Nhanh chóng - Tiện lợi.
                                <br className="d-none d-md-block" />
                                Kết nối đam mê trái bóng tròn mọi lúc, mọi nơi.
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <Button as={Link} to="/courts" variant="warning" className="px-4 py-2 fw-bold text-dark shadow rounded-pill">
                                    ĐẶT SÂN NGAY
                                </Button>
                                <Button variant="outline-light" className="px-4 py-2 fw-bold rounded-pill">
                                    LIÊN HỆ: 0866981044
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* 2. SÂN NỔI BẬT (NEW SECTION) */}
            <div className="bg-light py-5">
                <Container>
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <h2 className="fw-bold text-uppercase fs-3 text-dark mb-0">Sân Nổi Bật 🔥</h2>
                            <small className="text-muted">Những Sân Chất Lượng Tốt</small>
                        </div>
                        <Button as={Link} to="/courts" variant="outline-dark" className="rounded-pill px-4 fw-bold d-none d-md-block">
                            Xem Tất Cả <i className="bi bi-arrow-right ms-1"></i>
                        </Button>
                    </div>

                    <Row>
                        {topCourts.length > 0 ? (
                            topCourts.map((court) => (
                                <Col key={court.id} md={6} lg={3} className="mb-4">
                                    <Card className="h-100 border-0 shadow-sm hover-up">
                                        {/* PHẦN ẢNH SÂN */}
                                        <div style={{ position: 'relative', height: '180px', overflow: 'hidden', borderRadius: '5px 5px 0 0' }}>
                                            <Card.Img
                                                variant="top"
                                                src={court.image}
                                                style={{ height: '100%', objectFit: 'cover' }}
                                            />
                                            {/* Giữ lại nhãn HOT, bỏ nhãn sao 5.0 đi */}
                                            <Badge bg="danger" className="position-absolute top-0 start-0 m-2 shadow-sm">Hot</Badge>
                                        </div>

                                        {/* PHẦN THÔNG TIN */}
                                        <Card.Body>
                                            {/* SỬA ĐOẠN NÀY: Tên sân bên trái - Loại sân bên phải */}
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Card.Title
                                                    className="fw-bold fs-6 text-truncate"
                                                    title={court.name}
                                                    style={{ maxWidth: '65%' }} // Giới hạn chiều rộng tên để không đè lên badge
                                                >
                                                    {court.name}
                                                </Card.Title>

                                                {/* Hiển thị Category thật lấy từ DB */}
                                                {court.category && (
                                                    <Badge bg="secondary" className="fw-normal text-white" style={{ fontSize: '0.7rem' }}>
                                                        {court.category.name}
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="text-muted small mb-3 text-truncate">
                                                <i className="bi bi-geo-alt-fill text-warning me-1"></i>
                                                {court.location}
                                            </div>

                                            <h6 className="fw-bold text-primary mb-3">
                                                {court.pricePerHour ? court.pricePerHour.toLocaleString() : 0}đ
                                                <span className="text-muted small fw-normal">/h</span>
                                            </h6>

                                            <Button as={Link}
                                                to={`/courts/${court.id}`} variant="warning" size="sm" className="w-100 fw-bold rounded-pill">
                                                Đặt Ngay
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <div className="spinner-border text-warning" role="status"></div>
                            </div>
                        )}
                    </Row>

                    {/* Nút xem tất cả cho mobile */}
                    <div className="text-center mt-3 d-md-none">
                        <Button as={Link} to="/courts" variant="outline-dark" className="rounded-pill px-5 fw-bold">
                            Xem Tất Cả
                        </Button>
                    </div>
                </Container>
            </div>

            {/* 3. TẠI SAO CHỌN CHÚNG TÔI - Features */}
            <Container className="my-5 py-4">
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-uppercase fs-3" style={{ color: '#2c3e50' }}>Tại sao chọn chúng tôi?</h2>
                    <div style={{ width: '60px', height: '3px', backgroundColor: '#ffc107', margin: '10px auto' }}></div>
                </div>

                <Row className="g-4">
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm text-center py-4 hover-effect">
                            <Card.Body>
                                <div className="mb-3 text-warning">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
                                        <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                                    </svg>
                                </div>
                                <Card.Title className="fw-bold fs-5">Đặt Sân Siêu Tốc</Card.Title>
                                <Card.Text className="text-muted small">Chỉ mất 30 giây để tìm và giữ chỗ sân bóng yêu thích.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm text-center py-4 hover-effect">
                            <Card.Body>
                                <div className="mb-3 text-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.075c-.501-.126-.882-.317-.882-.683 0-.379.376-.649.898-.649.533 0-.898.32-.988.755h.382c-.056-.665-.616-1.156-1.344-1.206v-.44h-.375v.441c-.885.064-1.365.587-1.365 1.16 0-.57-.341-.922-1.036-1.125l-.296-.077c-.484-.119-.85-.322-.85-.674 0-.384.366-.671.904-.671.58 0 .96.346 1.017.833h.398z" />
                                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                    </svg>
                                </div>
                                <Card.Title className="fw-bold fs-5">Giá Cả Minh Bạch</Card.Title>
                                <Card.Text className="text-muted small">Cam kết giá niêm yết, không phụ phí ẩn.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm text-center py-4 hover-effect">
                            <Card.Body>
                                <div className="mb-3 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                </div>
                                <Card.Title className="fw-bold fs-5">Sân Bãi Chất Lượng</Card.Title>
                                <Card.Text className="text-muted small">Mặt sân đạt chuẩn FIFA, đèn chiếu sáng hiện đại.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>



            {/* CSS EFFECT */}
            <style>{`
                .hover-up { transition: transform 0.3s ease; }
                .hover-up:hover { transform: translateY(-5px); }
            `}</style>
        </div>
    );
};

export default HomePage;