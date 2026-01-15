import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { getUserProfile, updateUserProfile, changePassword } from '../../services/userService';

const SettingsPage = () => {
    const userId = localStorage.getItem("userId");
    
    // State cho Profile
    const [profile, setProfile] = useState({ fullName: '', phone: '', address: '', email: '' });
    const [msgProfile, setMsgProfile] = useState({ type: '', text: '' });
    
    // State cho Password
    const [passData, setPassData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [msgPass, setMsgPass] = useState({ type: '', text: '' });

    const [loading, setLoading] = useState(true);

    // 1. Load dữ liệu ban đầu
    useEffect(() => {
        if (!userId) return;
        const loadData = async () => {
            try {
                const data = await getUserProfile(userId);
                setProfile({
                    fullName: data.fullName || '',
                    phone: data.phone || '',
                    address: data.address || '',
                    email: data.email || '' 
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [userId]);

    // 2. Xử lý cập nhật thông tin
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setMsgProfile({ type: '', text: '' });
        try {
            await updateUserProfile(userId, {
                fullName: profile.fullName,
                phone: profile.phone,
                address: profile.address,
                email: profile.email 
            });
            setMsgProfile({ type: 'success', text: 'Cập nhật hồ sơ thành công!' });
            localStorage.setItem("userName", profile.fullName);
        } catch (err) {
            // Hiển thị lỗi từ backend (ví dụ: Email trùng)
            const errorText = err.response?.data || 'Lỗi cập nhật hồ sơ.';
            setMsgProfile({ type: 'danger', text: errorText });
        }
    };

    // 3. Xử lý đổi mật khẩu
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMsgPass({ type: '', text: '' });

        if (passData.newPassword.length < 6) {
            setMsgPass({ type: 'danger', text: 'Mật khẩu mới phải từ 6 ký tự.' });
            return;
        }
        if (passData.newPassword !== passData.confirmPassword) {
            setMsgPass({ type: 'danger', text: 'Mật khẩu xác nhận không khớp.' });
            return;
        }

        try {
            await changePassword(userId, {
                oldPassword: passData.oldPassword,
                newPassword: passData.newPassword
            });
            setMsgPass({ type: 'success', text: 'Đổi mật khẩu thành công!' });
            setPassData({ oldPassword: '', newPassword: '', confirmPassword: '' }); // Reset form
        } catch (err) {
            setMsgPass({ type: 'danger', text: err || 'Đổi mật khẩu thất bại.' });
        }
    };

    if (loading) return <div className="text-center mt-5 text-white"><Spinner animation="border" variant="warning"/></div>;

    return (
        <div style={{ backgroundColor: '#1a1d20', minHeight: '100vh', paddingBottom: '50px' }}>
            <Container className="py-5">
                <h2 className="text-white fw-bold mb-4 text-uppercase border-start border-4 border-warning ps-3">
                    Cài đặt tài khoản
                </h2>

                <Row>
                    {/* --- CỘT TRÁI: CẬP NHẬT HỒ SƠ --- */}
                    <Col md={6} className="mb-4">
                        <Card className="border-0 shadow-lg text-white" style={{ backgroundColor: '#2c3035' }}>
                            <Card.Header className="bg-transparent border-secondary fw-bold text-warning">
                                <i className="bi bi-person-lines-fill me-2"></i> Thông tin cá nhân
                            </Card.Header>
                            <Card.Body>
                                {msgProfile.text && <Alert variant={msgProfile.type}>{msgProfile.text}</Alert>}
                                <Form onSubmit={handleUpdateProfile}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            value={profile.email} 
                                            // SỬA: Bỏ disabled, thêm onChange
                                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                                            className="bg-dark text-white border-secondary" 
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Họ và Tên</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={profile.fullName} 
                                            onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                                            className="bg-dark text-white border-secondary"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={profile.phone} 
                                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                            className="bg-dark text-white border-secondary"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={profile.address} 
                                            onChange={(e) => setProfile({...profile, address: e.target.value})}
                                            className="bg-dark text-white border-secondary"
                                        />
                                    </Form.Group>
                                    <Button variant="warning" type="submit" className="fw-bold w-100 mt-2">
                                        LƯU THAY ĐỔI
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* --- CỘT PHẢI: ĐỔI MẬT KHẨU --- */}
                    <Col md={6}>
                        <Card className="border-0 shadow-lg text-white" style={{ backgroundColor: '#2c3035' }}>
                            <Card.Header className="bg-transparent border-secondary fw-bold text-danger">
                                <i className="bi bi-shield-lock-fill me-2"></i> Bảo mật
                            </Card.Header>
                            <Card.Body>
                                {msgPass.text && <Alert variant={msgPass.type}>{msgPass.text}</Alert>}
                                <Form onSubmit={handleChangePassword}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mật khẩu hiện tại</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            value={passData.oldPassword}
                                            onChange={(e) => setPassData({...passData, oldPassword: e.target.value})}
                                            className="bg-dark text-white border-secondary"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mật khẩu mới</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            value={passData.newPassword}
                                            onChange={(e) => setPassData({...passData, newPassword: e.target.value})}
                                            className="bg-dark text-white border-secondary"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            value={passData.confirmPassword}
                                            onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})}
                                            className="bg-dark text-white border-secondary"
                                        />
                                    </Form.Group>
                                    <Button variant="outline-light" type="submit" className="fw-bold w-100 mt-2">
                                        ĐỔI MẬT KHẨU
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SettingsPage;