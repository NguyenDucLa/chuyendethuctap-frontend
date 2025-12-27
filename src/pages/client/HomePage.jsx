import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const HomePage = () => {
    const [featuredCourts, setFeaturedCourts] = useState([]);

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const res = await api.get('/courts');
                setFeaturedCourts(res.data.slice(0, 3));
            } catch (error) {
                console.error("Lỗi tải sân trang chủ", error);
            }
        };
        fetchCourts();
    }, []);

    return (
        // NỀN CHUNG TOÀN TRANG: Màu xám rất nhạt (#f8f9fa)
        <div className="d-flex flex-column" style={{background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                minHeight: '100vh' }}>
            
            <div className="container-fluid p-0">
                
                {/* 1. BANNER SECTION (Giữ nguyên vì nó cần nổi bật) */}
                <div 
                    className="text-center py-5 d-flex flex-column justify-content-center align-items-center position-relative"
                    style={{ 
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #E3F2FD 100%)',
                        minHeight: '60vh',
                        borderBottom: '1px solid #dee2e6'
                    }}
                >
                    <div className="container animate__animated animate__fadeInUp">
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill fw-bold border border-primary border-opacity-25">
                            👋 Chào mừng đến với Football Booking
                        </span>
                        
                        <h1 className="display-4 fw-bold mb-3 text-dark">
                            Tìm Sân Chơi, <span className="text-primary">Thỏa Đam Mê</span>
                        </h1>
                        
                        <p className="lead mb-5 text-muted mx-auto" style={{ maxWidth: '700px' }}>
                            Hệ thống đặt sân bóng đá trực tuyến số 1. 
                            Tìm sân trống, so sánh giá và đặt lịch chỉ trong 30 giây.
                        </p>

                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/courts" className="btn btn-primary btn-lg fw-bold px-5 rounded-pill shadow-sm hover-scale">
                                ⚽ Đặt Sân Ngay
                            </Link>
                            <Link to="/register" className="btn btn-outline-dark btn-lg fw-bold px-5 rounded-pill hover-scale">
                                Đăng Ký
                            </Link>
                        </div>
                    </div>
                    
                    {/* Đường lượn sóng trang trí */}
                    <div className="position-absolute bottom-0 w-100 overflow-hidden" style={{ lineHeight: 0 }}>
                        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '60px', fill: '#f8f9fa' }}>
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                        </svg>
                    </div>
                </div>

                {/* --- TỪ ĐÂY TRỞ XUỐNG DÙNG CHUNG NỀN BACKGROUND --- */}

                {/* 2. SÂN NHIỀU NGƯỜI ĐẶT */}
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-dark">🔥 Sân Được Đặt Nhiều Nhất</h2>
                        <p className="text-muted">Khám phá các sân bóng đang hot trong cộng đồng</p>
                    </div>

                    <div className="row">
                        {featuredCourts.map((court) => (
                            <div className="col-md-4 mb-4" key={court.id}>
                                <div className="card h-100 shadow-sm border-0 hover-card">
                                    <div className="position-relative">
                                        <img 
                                            src={court.imageUrl || "https://conhantaothanhthuong.com/wp-content/uploads/2021/04/thi-cong-san-bong-da-co-nhan-tao-tai-da-nang-6.jpg"} 
                                            className="card-img-top" 
                                            alt={court.name}
                                            style={{ height: '220px', objectFit: 'cover' }} 
                                        />
                                        <span className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 m-2 rounded-pill fw-bold small shadow-sm">
                                            Hot
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold text-dark">{court.name}</h5>
                                        <p className="card-text text-muted mb-2 small"><i className="bi bi-geo-alt-fill text-danger"></i> {court.address}</p>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span className="text-primary fw-bold fs-5">{court.pricePerHour.toLocaleString()} đ/h</span>
                                            <span className="text-warning small"><i className="bi bi-star-fill"></i> 4.9 (120)</span>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-white border-0 pb-3 pt-0">
                                        <Link to={`/booking/${court.id}`} className="btn btn-outline-primary w-100 rounded-pill fw-bold">
                                            Đặt Sân Ngay
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-4 mb-5">
                        <Link to="/courts" className="btn btn-white text-primary fw-bold px-4 rounded-pill shadow-sm bg-white border">
                            Xem tất cả sân bóng <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>
                </div>

                {/* 3. WHY CHOOSE US (Đã bỏ nền riêng, hòa vào nền chung) */}
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-dark">Tại Sao Chọn Chúng Tôi?</h2>
                        <p className="text-muted">Quy trình đơn giản - Dịch vụ chuyên nghiệp</p>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <div className="p-4 rounded-4 h-100 bg-white shadow-sm border-0 hover-lift">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 text-primary">
                                    <i className="bi bi-calendar-check fs-2"></i>
                                </div>
                                <h5 className="fw-bold">Đặt Lịch 24/7</h5>
                                <p className="text-muted small">Chủ động chọn giờ, đặt sân mọi lúc mọi nơi ngay trên điện thoại.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="p-4 rounded-4 h-100 bg-white shadow-sm border-0 hover-lift">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 text-primary">
                                    <i className="bi bi-shield-lock fs-2"></i>
                                </div>
                                <h5 className="fw-bold">Bảo Mật An Toàn</h5>
                                <p className="text-muted small">Thông tin cá nhân và lịch sử giao dịch được mã hóa tuyệt đối.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="p-4 rounded-4 h-100 bg-white shadow-sm border-0 hover-lift">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 text-primary">
                                    <i className="bi bi-trophy fs-2"></i>
                                </div>
                                <h5 className="fw-bold">Sân Cỏ Chuẩn FIFA</h5>
                                <p className="text-muted small">Hệ thống đối tác sân cỏ nhân tạo đạt chất lượng cao.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TESTIMONIALS (Đã bỏ nền xanh, chữ chuyển sang màu đen) */}
                <div className="container py-5 mb-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-dark">Khách Hàng Nói Gì?</h2>
                        <p className="text-muted">Sự hài lòng của bạn là động lực của chúng tôi</p>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="bg-white text-dark p-4 rounded-4 shadow-sm h-100 border-0 hover-lift position-relative">
                                {/* Dấu ngoặc kép trang trí */}
                                <i className="bi bi-quote position-absolute top-0 start-0 fs-1 text-primary opacity-25 ms-3 mt-2"></i>
                                
                                <p className="mb-4 pt-3 text-muted fst-italic text-center">&quot;Dịch vụ đặt sân rất tiện lợi, tôi có thể đặt sân bất cứ lúc nào. Sân cỏ chất lượng tốt, giá cả hợp lý.&quot;</p>
                                
                                <div className="d-flex align-items-center justify-content-center border-top pt-3">
                                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="rounded-circle me-3 border border-2 border-primary" style={{ width: '45px', height: '45px' }} />
                                    <div className="text-start">
                                        <h6 className="mb-0 fw-bold small">Nguyễn Văn A</h6>
                                        <div className="text-warning small" style={{fontSize: '0.7rem'}}>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="bg-white text-dark p-4 rounded-4 shadow-sm h-100 border-0 hover-lift position-relative">
                                <i className="bi bi-quote position-absolute top-0 start-0 fs-1 text-primary opacity-25 ms-3 mt-2"></i>
                                <p className="mb-4 pt-3 text-muted fst-italic text-center">&quot;App dễ dùng, đặt sân nhanh. Đội ngũ support rất nhiệt tình khi mình cần đổi giờ đột xuất.&quot;</p>
                                <div className="d-flex align-items-center justify-content-center border-top pt-3">
                                    <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="User" className="rounded-circle me-3 border border-2 border-primary" style={{ width: '45px', height: '45px' }} />
                                    <div className="text-start">
                                        <h6 className="mb-0 fw-bold small">Trần Thị B</h6>
                                        <div className="text-warning small" style={{fontSize: '0.7rem'}}>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="bg-white text-dark p-4 rounded-4 shadow-sm h-100 border-0 hover-lift position-relative">
                                <i className="bi bi-quote position-absolute top-0 start-0 fs-1 text-primary opacity-25 ms-3 mt-2"></i>
                                <p className="mb-4 pt-3 text-muted fst-italic text-center">&quot;Từ ngày có web này, đội mình không lo thiếu sân đá nữa. Vote 5 sao cho chất lượng dịch vụ!&quot;</p>
                                <div className="d-flex align-items-center justify-content-center border-top pt-3">
                                    <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="User" className="rounded-circle me-3 border border-2 border-primary" style={{ width: '45px', height: '45px' }} />
                                    <div className="text-start">
                                        <h6 className="mb-0 fw-bold small">Lê Văn C</h6>
                                        <div className="text-warning small" style={{fontSize: '0.7rem'}}>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;