import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    
    // 1. Khai báo State
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 2. Hàm xử lý khi nhập liệu
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // 3. Hàm xử lý Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // --- VALIDATION: Kiểm tra mật khẩu ---
        if (credentials.password.length < 6) {
            setError("Mật khẩu tối thiểu 6 ký tự."); 
            return;
        }
        // ------------------------------------

        setLoading(true); 

        try {
            const data = await loginUser(credentials);
            if (data.token) {
                // 1. Lưu thông tin vào LocalStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("userRole", data.role);
                localStorage.setItem("userName", data.fullName);
                localStorage.setItem("userId", data.id);
                
                // 2. Hiện thông báo thành công (Màu xanh)
                toast.success(`Chào mừng ${data.fullName} quay trở lại!`);

                // 3. Chờ 1.5 giây để người dùng kịp đọc thông báo rồi mới chuyển trang
                setTimeout(() => {
                    window.location.href = "/"; 
                }, 1500);
            } else {
                // Báo lỗi (Màu đỏ)
                toast.error(data.message || "Đăng nhập thất bại");
                setLoading(false);
            }
        } catch (err) {
            // Báo lỗi khi sai mật khẩu hoặc lỗi server
            toast.error("Email hoặc mật khẩu không chính xác!");
            setLoading(false);
        }
    };

    // 4. Giao diện (JSX)
    return (
        <div className="d-flex align-items-center min-vh-100" style={{ backgroundColor: '#1a1d20' }}>
            <Container fluid>
                <Row className="justify-content-center">
                    {/* CỘT TRÁI: ẢNH MINH HỌA (Ẩn trên mobile) */}
                    <Col md={6} lg={5} className="d-none d-md-block p-0">
                        <div style={{
                            backgroundImage: 'url("https://img.lovepik.com/original_origin_pic/18/07/06/5edc8d4ef915a380430d1f21d4bc9939.png_wh860.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '80vh',
                            borderRadius: '20px 0 0 20px',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
                                borderRadius: '20px 0 0 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '40px'
                            }}>
                                <h2 className="text-white fw-bold display-5">Welcome Back!</h2>
                                <p className="text-white-50 fs-5">Sẵn sàng cho trận đấu tiếp theo của bạn chưa?</p>
                            </div>
                        </div>
                    </Col>

                    {/* CỘT PHẢI: FORM ĐĂNG NHẬP */}
                    <Col md={6} lg={4} className="bg-dark p-5 d-flex flex-column justify-content-center" 
                         style={{ height: '80vh', borderRadius: '0 20px 20px 0', border: '1px solid #333' }}>
                        
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-warning text-uppercase">Đăng Nhập</h2>
                            <p className="text-white-50">Nhập thông tin để truy cập tài khoản</p>
                        </div>

                        {error && <Alert variant="danger" className="text-center bg-danger text-white border-0">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label className="text-white fw-semibold">Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    required 
                                    onChange={handleChange} 
                                    placeholder="name@example.com"
                                    style={{ backgroundColor: '#2c3035', border: 'none', color: 'white', padding: '12px' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-white fw-semibold">Mật khẩu</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password" 
                                    required 
                                    onChange={handleChange} 
                                    placeholder="••••••••"
                                    style={{ backgroundColor: '#2c3035', border: 'none', color: 'white', padding: '12px' }}
                                />
                            </Form.Group>

                            <Button variant="warning" type="submit" className="w-100 fw-bold py-3 text-dark text-uppercase shadow-lg mb-3" disabled={loading}>
                                {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP NGAY'}
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <span className="text-white-50">Chưa có tài khoản? </span>
                            <Link to="/register" className="text-warning fw-bold text-decoration-none">
                                Đăng ký miễn phí
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginPage;