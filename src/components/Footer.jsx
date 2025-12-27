import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-4 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Cột 1: Thông tin chung */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="text-uppercase fw-bold text-primary mb-3">⚽ Hệ Thống Đặt Sân</h5>
                        <p className="text-muted mb-3">
                            Nền tảng đặt sân bóng đá trực tuyến hàng đầu. 
                            Kết nối đam mê, thỏa sức ra sân!
                        </p>
                        <div className="d-flex">
                            <a href="#" className="text-light me-3 fs-4" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#0984e3'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="text-light me-3 fs-4" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#0984e3'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="text-light me-3 fs-4" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#0984e3'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="#" className="text-light fs-4" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#0984e3'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="text-uppercase fw-bold mb-3">Liên Kết</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-decoration-none text-light" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#0984e3'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                                    Trang Chủ
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/courts" className="text-decoration-none text-light" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#0984e3'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                                    Danh Sách Sân
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/login" className="text-decoration-none text-light" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#0984e3'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                                    Đăng Nhập / Đăng Ký
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="text-decoration-none text-light" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#0984e3'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                                    Về Chúng Tôi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Liên hệ */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="text-uppercase fw-bold mb-3">Liên Hệ</h5>
                        <p className="mb-2"><i className="bi bi-geo-alt-fill text-primary me-2"></i> TPHCM, Việt Nam</p>
                        <p className="mb-2"><i className="bi bi-envelope-fill text-primary me-2"></i> nguyenducla113@gmail.com</p>
                        <p className="mb-2"><i className="bi bi-telephone-fill text-primary me-2"></i> 0866981044 (Hotline)</p>
                        <p className="mb-0"><i className="bi bi-clock-fill text-primary me-2"></i> 8:00 - 21:00 hàng ngày</p>
                    </div>
                </div>

                <hr className="border-secondary my-4" />
                
                <div className="text-center text-muted">
                    <small>&copy; 2025 Football Booking System. Tất cả quyền được bảo lưu. | Thiết kế bởi Nguyễn Đức La</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;