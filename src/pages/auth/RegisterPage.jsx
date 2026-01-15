import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// Thêm useSearchParams
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const navigate = useNavigate();
    
    // 1. Lấy tham số trên URL (?mode=admin)
    const [searchParams] = useSearchParams();
    const isAdminMode = searchParams.get('mode') === 'admin';

    const [formData, setFormData] = useState({
        email: '', password: '', fullName: '', phone: '', address: ''
    });
    const [loading, setLoading] = useState(false);

    // Xóa mấy cái state message/error cũ đi vì dùng toast rồi
    // const [message, setMessage] = useState('');
    // const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation giữ nguyên
        if (formData.password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Số điện thoại không hợp lệ!");
            return;
        }
        
        setLoading(true);

        try {
            const data = await registerUser(formData);
            
            if (data.message === "Đăng ký thành công!") {
                
                // --- LOGIC PHÂN LUỒNG ---
                if (isAdminMode) {
                    // Nếu là Admin thêm
                    toast.success("Đã thêm người dùng mới thành công!");
                    navigate('/admin/users'); // Quay về trang quản lý
                } else {
                    // Nếu là Khách đăng ký
                    toast.success("Đăng ký thành công! Đang chuyển hướng...");
                    setTimeout(() => { navigate('/login'); }, 1500);
                }
                
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || "Đăng ký thất bại!");
            } else {
                toast.error("Lỗi kết nối.");
            }
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center py-5" style={{ backgroundColor: '#1a1d20', minHeight: '100vh' }}>
            <Container fluid>
                <Row className="justify-content-center">
                    
                    {/* Cột Trái */}
                    <Col md={6} lg={4} className="bg-dark p-5 d-flex flex-column justify-content-center" 
                         style={{ minHeight: '85vh', borderRadius: '20px 0 0 20px', border: '1px solid #333' }}>
                        
                        <div className="text-center mb-4">
                            {/* Đổi tiêu đề dựa theo Mode */}
                            <h2 className="fw-bold text-warning text-uppercase">
                                {isAdminMode ? "THÊM NGƯỜI DÙNG" : "TẠO TÀI KHOẢN"}
                            </h2>
                            <p className="text-white-50">
                                {isAdminMode ? "Tạo tài khoản mới cho khách hàng" : "Tham gia cộng đồng bóng đá lớn nhất"}
                            </p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            {/* ... Các ô input giữ nguyên ... */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white fw-semibold">Họ và Tên</Form.Label>
                                <Form.Control type="text" name="fullName" required onChange={handleChange} 
                                    className="bg-secondary text-white border-0 py-2" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="text-white fw-semibold">Email</Form.Label>
                                <Form.Control type="email" name="email" required onChange={handleChange} 
                                    className="bg-secondary text-white border-0 py-2" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="text-white fw-semibold">Số điện thoại</Form.Label>
                                <Form.Control type="text" name="phone" required onChange={handleChange} 
                                    className="bg-secondary text-white border-0 py-2" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="text-white fw-semibold">Địa chỉ</Form.Label>
                                <Form.Control type="text" name="address" onChange={handleChange} 
                                    className="bg-secondary text-white border-0 py-2" />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-white fw-semibold">Mật khẩu</Form.Label>
                                <Form.Control type="password" name="password" required onChange={handleChange} 
                                    className="bg-secondary text-white border-0 py-2" />
                            </Form.Group>

                            <Button variant="warning" type="submit" className="w-100 fw-bold py-3 text-dark text-uppercase shadow-lg mb-3" disabled={loading}>
                                {loading ? 'Đang xử lý...' : (isAdminMode ? 'THÊM NGƯỜI DÙNG' : 'ĐĂNG KÝ NGAY')}
                            </Button>
                        </Form>

                        {/* Nếu là Admin thì hiện nút quay lại Admin, Khách thì hiện nút Login */}
                        <div className="text-center mt-2">
                            {isAdminMode ? (
                                <Link to="/admin/users" className="text-secondary text-decoration-none">
                                    <i className="bi bi-arrow-left"></i> Quay lại danh sách
                                </Link>
                            ) : (
                                <>
                                    <span className="text-white-50">Đã có tài khoản? </span>
                                    <Link to="/login" className="text-warning fw-bold text-decoration-none">
                                        Đăng nhập
                                    </Link>
                                </>
                            )}
                        </div>
                    </Col>

                    {/* Cột Phải (Ảnh) - Giữ nguyên */}
                    <Col md={6} lg={5} className="d-none d-md-block p-0">
                        <div style={{
                            backgroundImage: 'url("https://img.lovepik.com/free-png/20211209/lovepik-soccer-player-png-image_401442736_wh1200.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '100%',
                            minHeight: '85vh',
                            borderRadius: '0 20px 20px 0',
                            position: 'relative'
                        }}>
                            {/* Overlay giữ nguyên */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
                                borderRadius: '0 20px 20px 0',
                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '40px'
                            }}>
                                <h2 className="text-white fw-bold display-5">Join The Game</h2>
                                <p className="text-white-50 fs-5">Kết nối, đặt sân và thi đấu ngay hôm nay.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterPage;