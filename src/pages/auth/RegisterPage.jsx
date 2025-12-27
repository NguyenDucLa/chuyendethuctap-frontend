import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    
    // State lưu dữ liệu form
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    // Hàm xử lý khi nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Hàm xử lý khi bấm Đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();

        // 1. Kiểm tra mật khẩu nhập lại có khớp không
        if (formData.password !== formData.confirmPassword) {
            toast.error("Mật khẩu nhập lại không khớp!");
            return;
        }

        try {
            // 2. Gọi API đăng ký
            // Backend cần: fullName, email, password, phone (Không cần confirmPassword)
            const dataToSend = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            };

            await api.register(dataToSend);
            
            // 3. Thành công
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            navigate('/login'); // Chuyển hướng sang trang đăng nhập

        } catch (error) {
            // Xử lý lỗi (ví dụ: Email đã tồn tại)
            const errorMsg = error.response?.data?.message || "Đăng ký thất bại! Email có thể đã tồn tại.";
            toast.error(errorMsg);
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
                    width: '500px', 
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary mb-2">📝 Đăng Ký Tài Khoản</h2>
                    <p className="text-muted">Tạo tài khoản để đặt sân ngay hôm nay!</p>
                </div>
                
                <form onSubmit={handleRegister}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">👤 Họ và Tên</label>
                            <input 
                                type="text" name="fullName" className="form-control form-control-lg rounded-pill" placeholder="Ví dụ: Nguyễn Văn A"
                                value={formData.fullName} onChange={handleChange} required 
                                style={{ border: '2px solid #ddd', transition: 'border-color 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = '#0984e3'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">📧 Email</label>
                            <input 
                                type="email" name="email" className="form-control form-control-lg rounded-pill" placeholder="name@example.com"
                                value={formData.email} onChange={handleChange} required 
                                style={{ border: '2px solid #ddd', transition: 'border-color 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = '#0984e3'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">📞 Số Điện Thoại</label>
                        <input 
                            type="text" name="phone" className="form-control form-control-lg rounded-pill" placeholder="09xxx..."
                            value={formData.phone} onChange={handleChange} required 
                            style={{ border: '2px solid #ddd', transition: 'border-color 0.3s' }}
                            onFocus={(e) => e.target.style.borderColor = '#0984e3'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">🔒 Mật Khẩu</label>
                            <input 
                                type="password" name="password" className="form-control form-control-lg rounded-pill" 
                                value={formData.password} onChange={handleChange} required 
                                style={{ border: '2px solid #ddd', transition: 'border-color 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = '#0984e3'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">🔒 Nhập Lại Mật Khẩu</label>
                            <input 
                                type="password" name="confirmPassword" className="form-control form-control-lg rounded-pill" 
                                value={formData.confirmPassword} onChange={handleChange} required 
                                style={{ border: '2px solid #ddd', transition: 'border-color 0.3s' }}
                                onFocus={(e) => e.target.style.borderColor = '#0984e3'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-success w-100 btn-lg rounded-pill fw-bold mb-3"
                        style={{
                            background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
                            border: 'none',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        🚀 Đăng Ký Ngay
                    </button>
                </form>

                <div className="text-center">
                    <p className="mb-0 text-muted">Đã có tài khoản? 
                        <Link to="/login" className="text-primary fw-bold ms-1">Đăng nhập tại đây</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;