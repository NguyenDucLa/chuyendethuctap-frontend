import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyFooter = () => {
    return (
        <footer style={{ backgroundColor: '#000000', color: '#b0b0b0', paddingTop: '60px' }}>
            <Container>
                <Row>
                    {/* CỘT 1: THƯƠNG HIỆU & GIỚI THIỆU */}
                    <Col md={4} className="mb-4">
                        <h3 className="text-white fw-bold text-uppercase mb-3">
                            FOOTBALL <span className="text-warning">BOOKING</span>
                        </h3>
                        <p className="small lh-lg">
                            Nơi kết nối đam mê trái bóng tròn và mang lại trải nghiệm đặt sân
                            nhanh chóng, tiện lợi nhất cho cộng đồng yêu thể thao.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a  className="text-white fs-5 social-icon"><i className="bi bi-facebook"></i></a>
                            <a  className="text-white fs-5 social-icon"><i className="bi bi-instagram"></i></a>
                            <a  className="text-white fs-5 social-icon"><i className="bi bi-twitter-x"></i></a>
                            <a  className="text-white fs-5 social-icon"><i className="bi bi-youtube"></i></a>
                        </div>
                    </Col>

                    {/* CỘT 2: LIÊN KẾT NHANH */}
                    <Col md={2} sm={6} className="mb-4">
                        <h6 className="text-white fw-bold text-uppercase mb-4 ls-1">Liên Kết</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link  className="footer-link">Trang chủ</Link></li>
                            <li className="mb-2"><Link  className="footer-link">Danh sách sân</Link></li>
                            <li className="mb-2"><Link  className="footer-link">Giới thiệu</Link></li>
                            <li className="mb-2"><Link  className="footer-link">Liên hệ</Link></li>
                        </ul>
                    </Col>

                    {/* CỘT 3: HỖ TRỢ */}
                    <Col md={3} sm={6} className="mb-4">
                        <h6 className="text-white fw-bold text-uppercase mb-4 ls-1">Hỗ Trợ</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link  className="footer-link">Điều khoản dịch vụ</Link></li>
                            <li className="mb-2"><Link  className="footer-link">Chính sách bảo mật</Link></li>
                            <li className="mb-2"><Link className="footer-link">Câu hỏi thường gặp</Link></li>
                            <li className="mb-2"><Link  className="footer-link">Khiếu nại & Góp ý</Link></li>
                        </ul>
                    </Col>

                    {/* CỘT 4: THÔNG TIN LIÊN HỆ */}
                    <Col md={3} className="mb-4">
                        <h6 className="text-white fw-bold text-uppercase mb-4 ls-1">Liên Hệ</h6>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex">
                                <i className="bi bi-envelope text-warning me-2"></i>
                                <span>nguyenducla113@gmail.com</span>
                            </li>
                            <li className="mb-3 d-flex">
                                <i className="bi bi-telephone text-warning me-2"></i>
                                <span>0866981044</span>
                            </li>
                            <li className="mb-3 d-flex">
                                <i className="bi bi-geo-alt text-warning me-2"></i>
                                <span>TP. Hồ Chí Minh</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            {/* DÒNG BẢN QUYỀN CUỐI CÙNG */}
            <div className="py-3 mt-4 border-top border-secondary text-center small" 
                 style={{ backgroundColor: '#050505', color: '#6c757d' }}>
                <Container>
                    &copy; 2026 FOOTBALL BOOKING PROJECT • DESIGN BY NGUYEN DUC LA
                </Container>
            </div>

            {/* CSS RIÊNG CHO FOOTER (Hiệu ứng hover) */}
            <style>{`
                .footer-link {
                    color: #b0b0b0;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .footer-link:hover {
                    color: #ffc107; /* Màu vàng khi rê chuột vào */
                    padding-left: 5px;
                }
                .social-icon {
                    transition: color 0.3s;
                }
                .social-icon:hover {
                    color: #ffc107 !important;
                }
                .ls-1 {
                    letter-spacing: 1px;
                }
            `}</style>
        </footer>
    );
};

export default MyFooter;