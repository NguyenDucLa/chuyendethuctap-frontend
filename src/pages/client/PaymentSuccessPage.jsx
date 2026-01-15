import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: '#1a1d20' }}>
            <Card className="text-center p-5 border-0 shadow-lg" style={{ backgroundColor: '#2c3035', color: 'white', maxWidth: '500px' }}>
                <div className="mb-4">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
                </div>
                <h2 className="fw-bold mb-3">Thanh Toán Thành Công!</h2>
                <p className="text-white-50 mb-4">
                    Cảm ơn bạn đã đặt sân. Hệ thống đã ghi nhận lịch của bạn.
                    Vui lòng kiểm tra email hoặc lịch sử đặt sân.
                </p>
                <div className="d-grid gap-2">
                    <Button as={Link} to="/history" variant="warning" className="fw-bold rounded-pill">
                        Xem lịch sử đặt sân
                    </Button>
                    <Button as={Link} to="/" variant="outline-light" className="rounded-pill">
                        Về trang chủ
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PaymentSuccessPage;