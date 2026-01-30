import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

const MyNavbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fullName = localStorage.getItem("userName");
        const role = localStorage.getItem("userRole"); // Lấy thêm Role
        
        if (token && fullName) {
            setUser({
                name: fullName,
                initial: fullName.charAt(0).toUpperCase(),
                role: role // Lưu role vào state
            });
        }
    }, []);

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault(); 
        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
            setKeyword(''); 
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3 sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-warning fs-4 me-4">
                    ⚽ FOOTBALL BOOKING
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/" className="fw-semibold px-3 text-uppercase">Trang Chủ</Nav.Link>
                        <Nav.Link as={Link} to="/courts" className="fw-semibold px-3 text-uppercase">Danh Sách Sân</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="fw-semibold px-3 text-uppercase">Liên Hệ</Nav.Link>
                    </Nav>

                    <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                        {/* FORM TÌM KIẾM */}
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <InputGroup>
                                <Form.Control
                                    type="search"
                                    placeholder="Tìm sân..."
                                    className="bg-secondary text-white border-0"
                                    style={{ borderRadius: '20px 0 0 20px', maxWidth: '200px' }}
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <Button variant="secondary" type="submit" style={{ borderRadius: '0 20px 20px 0', borderLeft: '1px solid #555' }}>
                                    <i className="bi bi-search text-warning"></i>
                                </Button>
                            </InputGroup>
                        </Form>

                        {/* KHU VỰC TÀI KHOẢN */}
                        {user ? (
                            <NavDropdown 
                                title={
                                    <div className="d-inline-flex align-items-center">
                                        <div className="d-flex justify-content-center align-items-center me-2 text-white fw-bold shadow-sm"
                                            style={{
                                                width: '35px', height: '35px', borderRadius: '50%', 
                                                // Admin màu Vàng, User màu Đỏ
                                                backgroundColor: user.role === 'ADMIN' ? '#ffc107' : '#dc3545', 
                                                color: user.role === 'ADMIN' ? '#000' : '#fff',
                                                fontSize: '16px'
                                            }}
                                        >
                                            {user.initial}
                                        </div>
                                        <span className="fw-semibold text-light me-1">Hi, {user.name}</span>
                                    </div>
                                } 
                                id="user-dropdown" 
                                align="end"
                            >
                                {/* --- NÚT CHUYỂN SANG TRANG ADMIN (Chỉ hiện khi là ADMIN) --- */}
                                {user.role === 'ADMIN' && (
                                    <>
                                        <NavDropdown.Item as={Link} to="/admin" className="py-2 text-warning fw-bold bg-dark mb-1 border-bottom border-secondary">
                                            <i className="bi bi-speedometer2 me-2"></i> TRANG QUẢN TRỊ
                                        </NavDropdown.Item>
                                    </>
                                )}
                                {/* -------------------------------------------------------- */}

                                <NavDropdown.Item as={Link} to="/dashboard" className="py-2">
                                    <i className="bi bi-person-circle me-2"></i> Dashboard cá nhân
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/history" className="py-2">
                                    <i className="bi bi-receipt me-2"></i> Lịch sử đặt sân
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings" className="py-2">
                                    <i className="bi bi-gear me-2"></i> Cài đặt
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className="text-danger fw-bold py-2">
                                    <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <div className="d-flex gap-2">
                                <Button variant="outline-light" size="sm" className="px-3 rounded-pill" as={Link} to="/login">Đăng Nhập</Button>
                                <Button variant="warning" size="sm" className="fw-bold px-3 rounded-pill" as={Link} to="/register">Đăng Ký</Button>
                            </div>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;