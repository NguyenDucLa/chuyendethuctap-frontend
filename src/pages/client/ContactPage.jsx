import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify'; 
import { sendContact } from '../../services/contactService';

const ContactPage = () => {
    // 1. Khai báo State để lưu dữ liệu form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        message: ''
    });
    
    // State loading để disable nút khi đang gửi
    const [loading, setLoading] = useState(false);

    // 2. Hàm xử lý khi người dùng nhập liệu
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Hàm xử lý gửi tin nhắn
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Bắt đầu loading

        try {
            // Gọi API
            await sendContact(formData);
            
            // Thông báo thành công
            toast.success("Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn.");
            
            // Reset form về rỗng
            setFormData({ name: '', email: '', title: '', message: '' });
        } catch (error) {
            console.error(error);
            toast.error("Gửi thất bại. Vui lòng thử lại sau!");
        } finally {
            setLoading(false); // Tắt loading
        }
    };

    return (
        <div style={{ backgroundColor: '#1a1d20', minHeight: '100vh', paddingBottom: '50px' }}>
            
            {/* Header */}
            <div className="bg-dark py-5 mb-5 border-bottom border-secondary">
                <Container className="text-center">
                    <h2 className="text-white fw-bold text-uppercase display-5">Liên Hệ Với Chúng Tôi</h2>
                    <p className="text-white-50 fs-5">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
                </Container>
            </div>

            <Container>
                <Row>
                    {/* CỘT TRÁI: FORM LIÊN HỆ */}
                    <Col md={6} className="mb-4">
                        <Card className="h-100 border-0 shadow-lg text-white" style={{ backgroundColor: '#2c3035' }}>
                            <Card.Body className="p-4">
                                <h4 className="fw-bold mb-4 text-warning">Gửi tin nhắn</h4>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Họ tên</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    name="name" // Quan trọng: phải khớp với key trong state
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Nhập họ tên" 
                                                    className="bg-dark text-white border-secondary" 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control 
                                                    type="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Nhập email" 
                                                    className="bg-dark text-white border-secondary" 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tiêu đề</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Bạn cần hỗ trợ gì?" 
                                            className="bg-dark text-white border-secondary" 
                                            required 
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Nội dung</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={5} 
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Nhập nội dung tin nhắn..." 
                                            className="bg-dark text-white border-secondary" 
                                            required 
                                        />
                                    </Form.Group>
                                    <Button 
                                        variant="warning" 
                                        type="submit" 
                                        className="w-100 fw-bold py-2 shadow"
                                        disabled={loading} // Khóa nút khi đang gửi
                                    >
                                        {loading ? "ĐANG GỬI..." : "GỬI TIN NHẮN"}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* CỘT PHẢI: THÔNG TIN & BẢN ĐỒ (Giữ nguyên) */}
                    <Col md={6} className="mb-4">
                        <div className="h-100 d-flex flex-column gap-4">
                            {/* Card Thông tin */}
                            <Card className="border-0 shadow-lg text-white" style={{ backgroundColor: '#2c3035' }}>
                                <Card.Body>
                                    <h4 className="fw-bold mb-4 text-warning">Thông tin liên hệ</h4>
                                    <div className="mb-3 d-flex align-items-center">
                                        <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                            <i className="bi bi-geo-alt-fill fs-5"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Địa chỉ</div>
                                            <div className="text-white-50">12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP.HCM</div>
                                        </div>
                                    </div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                            <i className="bi bi-telephone-fill fs-5"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Hotline</div>
                                            <div className="text-white-50">0866981044</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                            <i className="bi bi-envelope-fill fs-5"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold">Email</div>
                                            <div className="text-white-50">nguyenducla113@gmail.com</div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Bản đồ Google Map */}
                            <Card className="border-0 shadow-lg flex-grow-1 overflow-hidden" style={{ backgroundColor: '#2c3035', minHeight: '300px' }}>
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858169091027!2d106.68427047480558!3d10.822164189329433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e549695d13%3A0x3337e1c07a58a5f8!2zVHLGsOG7nW5nIENhbyDEkOG6sW5nIEPDtG5nIFRoxrDGoW5nIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ContactPage;