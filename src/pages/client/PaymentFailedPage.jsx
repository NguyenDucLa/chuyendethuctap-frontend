import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PaymentFailedPage = () => {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: '#1a1d20' }}>
            <Card className="text-center p-5 border-0 shadow-lg" style={{ backgroundColor: '#2c3035', color: 'white', maxWidth: '500px' }}>
                <div className="mb-4">
                    <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '5rem' }}></i>
                </div>
                <h2 className="fw-bold mb-3 text-danger">Thanh Toán Thất Bại!</h2>
                <p className="text-white-50 mb-4">
                    Giao dịch đã bị hủy hoặc có lỗi xảy ra.
                    Đơn đặt sân của bạn chưa được ghi nhận.
                </p>
                <div className="d-grid gap-2">
                    <Button as={Link} to="/courts" variant="warning" className="fw-bold rounded-pill">
                        Đặt lại sân khác
                    </Button>
                    <Button as={Link} to="/" variant="outline-light" className="rounded-pill">
                        Về trang chủ
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PaymentFailedPage;