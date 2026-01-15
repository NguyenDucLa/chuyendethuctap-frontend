import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation(); // Để biết đang ở trang nào mà bôi đậm

    // Hàm kiểm tra active
    const isActive = (path) => location.pathname === path;

    const navLinkStyle = (path) => ({
        color: isActive(path) ? '#000' : '#b0b0b0',
        backgroundColor: isActive(path) ? '#ffc107' : 'transparent',
        fontWeight: isActive(path) ? 'bold' : 'normal',
        borderRadius: '8px',
        margin: '5px 0',
        padding: '12px 20px',
        transition: '0.3s'
    });

    return (
        <div className="d-flex flex-column p-3 text-white" style={{ width: '280px', minHeight: '100vh', backgroundColor: '#151515', borderRight: '1px solid #333' }}>
            <Link to="/admin" className="d-flex align-items-center mb-4 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4 fw-bold text-warning">ADMIN PANEL</span>
            </Link>
            <hr />
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/admin" style={navLinkStyle('/admin')}>
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/courts" style={navLinkStyle('/admin/courts')}>
                    <i className="bi bi-dribbble me-2"></i> Quản lý Sân
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/categories" style={navLinkStyle('/admin/categories')}>
                    <i className="bi bi-tags me-2"></i> Quản lý Danh Mục
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/bookings" style={navLinkStyle('/admin/bookings')}>
                    <i className="bi bi-calendar-check me-2"></i> Quản lý Đặt lịch
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/users" style={navLinkStyle('/admin/users')}>
                    <i className="bi bi-people me-2"></i> Quản lý User
                </Nav.Link>

                <Nav.Link as={Link} to="/admin/contacts" style={navLinkStyle('/admin/contacts')}>
                    <i className="bi bi-envelope-paper me-2"></i> Phản hồi khách hàng
                </Nav.Link>

                <hr className="my-4" style={{ borderColor: '#555' }} />

                <Nav.Link as={Link} to="/" className="text-white-50">
                    <i className="bi bi-box-arrow-left me-2"></i> Về trang chủ
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default AdminSidebar;