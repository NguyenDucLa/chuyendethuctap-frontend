import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api' // Import cái api mình vừa tạo
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Chặn việc reload trang
        try {
            // Gọi API đăng nhập
            const response = await api.post('/auth/login', {
                email: email,
                password: password
            });

            // Nếu thành công:
            toast.success("Đăng nhập thành công!");
            
            // 1. Lưu token vào bộ nhớ trình duyệt
            localStorage.setItem('token', response.data.token);
            
            // 2. Chuyển hướng về trang chủ
            navigate('/'); 
            
        } catch (error) {
            // Nếu thất bại
            toast.error("Đăng nhập thất bại! Kiểm tra lại email/pass.");
            console.error(error);
        }
    };

    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100" 
            style={{
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                minHeight: '100vh'
            }}
        >
            <div 
                className="card p-5 shadow-lg border-0" 
                style={{ 
                    width: '450px', 
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary mb-2">🔐 Đăng Nhập</h2>
                    <p className="text-muted">Chào mừng bạn quay trở lại!</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">📧 Email:</label>
                        <input 
                            type="email" 
                            className="form-control form-control-lg rounded-pill" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            required
                            style={{ border: '2px solid #ddd', transition: 'border-color 0.3s' }}
                            onFocus={(e) => e.target.style.borderColor = '#0984e3'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">🔒 Mật khẩu:</label>
                        <input 
                            type="password" 
                            className="form-control form-control-lg rounded-pill" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            required
                            style={{ border: '2px solid #ddd', transition: 'border-color 0.3s' }}
                            onFocus={(e) => e.target.style.borderColor = '#0984e3'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 btn-lg rounded-pill fw-bold mb-3"
                        style={{
                            background: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
                            border: 'none',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        🚀 Đăng Nhập
                    </button>
                </form>
                <div className="text-center">
                    <p className="mb-0 text-muted">Chưa có tài khoản? 
                        <Link to="/register" className="text-primary fw-bold ms-1">Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;