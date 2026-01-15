import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourtById, getBookedSlots, createBooking } from '../../services/courtService';

// --- HÀM HỖ TRỢ: LẤY NGÀY HIỆN TẠI (THEO GIỜ ĐỊA PHƯƠNG) ---
// Dùng cái này thay cho toISOString() để tránh bị lệch múi giờ
const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const CourtDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [court, setCourt] = useState(null);
    
    // SỬA: Khởi tạo ngày bằng hàm getTodayString() chuẩn
    const [selectedDate, setSelectedDate] = useState(getTodayString());

    const [bookedHours, setBookedHours] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [duration, setDuration] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('CASH'); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const timeSlots = Array.from({ length: 16 }, (_, i) => i + 7); // 7h -> 22h

    useEffect(() => {
        const fetchCourt = async () => {
            try {
                const data = await getCourtById(id);
                setCourt(data);
            } catch (error) {
                console.error("Lỗi tải sân");
            }
        };
        fetchCourt();
    }, [id]);

    const fetchAndProcessSlots = async () => {
        if (id && selectedDate) {
            const bookings = await getBookedSlots(id, selectedDate);
            let occupied = [];
            bookings.forEach(b => {
                for (let i = b.startTime; i < b.endTime; i++) {
                    occupied.push(i);
                }
            });
            setBookedHours(occupied);
            setSelectedSlot(null);
        }
    };

    useEffect(() => {
        fetchAndProcessSlots();
    }, [id, selectedDate]);

    const isSlotValid = (startHour) => {
        for (let i = 0; i < duration; i++) {
            if (bookedHours.includes(startHour + i) || (startHour + i) >= 23) {
                return false;
            }
        }
        return true;
    };

    const handleBooking = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để đặt sân!");
            navigate('/login');
            return;
        }
        if (!selectedSlot) {
            alert("Vui lòng chọn khung giờ!");
            return;
        }

        setLoading(true);
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Lỗi xác thực: Vui lòng đăng nhập lại!");
                navigate('/login');
                return;
            }

            const bookingData = {
                userId: userId,
                courtId: id,
                date: selectedDate,
                startTime: selectedSlot,
                duration: duration, 
                paymentMethod: paymentMethod
            };

            const response = await createBooking(bookingData);

            if (typeof response === 'string' && (response.startsWith('http') || response.startsWith('https'))) {
                window.location.href = response;
            } else {
                setMessage(`Đặt sân thành công! (${duration} tiếng)`);
                await fetchAndProcessSlots();
            }

        } catch (error) {
            console.error(error);
            alert("Lỗi đặt sân: " + (error.response?.data || "Có lỗi xảy ra"));
        } finally {
            setLoading(false);
        }
    };

    if (!court) return <div className="text-white text-center mt-5">Đang tải...</div>;

    const totalAmount = court.pricePerHour * duration;

    return (
        <div style={{ backgroundColor: '#1a1d20', minHeight: '100vh', paddingBottom: '50px' }}>
            <Container className="py-5">
                <Button variant="outline-light" className="mb-4" onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                </Button>

                <Row>
                    <Col md={5} className="mb-4">
                        <Card className="border-0 shadow-lg" style={{ backgroundColor: '#2c3035' }}>
                            <Card.Img variant="top" src={court.image} style={{ height: '300px', objectFit: 'cover' }} />
                            <Card.Body className="text-white p-4">
                                <h2 className="fw-bold text-warning mb-3">{court.name}</h2>
                                <p className="text-light opacity-75"><i className="bi bi-geo-alt-fill text-danger me-2"></i> {court.location}</p>
                                <hr className="border-secondary" />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-white-50">Giá niêm yết:</span>
                                    <h3 className="text-white fw-bold m-0">{court.pricePerHour.toLocaleString()}đ<span className="fs-6 fw-normal">/h</span></h3>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={7}>
                        <Card className="border-0 shadow-lg h-100" style={{ backgroundColor: '#2c3035' }}>
                            <Card.Body className="p-4 text-white">
                                <h4 className="fw-bold mb-4 border-start border-4 border-warning ps-3">ĐẶT LỊCH ONLINE</h4>
                                {message && <Alert variant="success">{message}</Alert>}

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold text-warning">Chọn ngày:</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                min={getTodayString()} // SỬA: Chặn chọn ngày quá khứ
                                                className="bg-dark text-white border-secondary"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold text-warning">Thời lượng:</Form.Label>
                                            <Form.Select
                                                className="bg-dark text-white border-secondary"
                                                value={duration}
                                                onChange={(e) => {
                                                    setDuration(parseInt(e.target.value));
                                                    setSelectedSlot(null);
                                                }}
                                            >
                                                <option value="1">1 Tiếng (60p)</option>
                                                <option value="2">2 Tiếng (120p)</option>
                                                <option value="3">3 Tiếng (180p)</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold text-warning">Phương thức thanh toán:</Form.Label>
                                    <Row className="g-3">
                                        <Col sm={6}>
                                            <div 
                                                className={`p-3 border rounded d-flex align-items-center justify-content-center cursor-pointer ${paymentMethod === 'CASH' ? 'border-warning bg-secondary' : 'border-secondary bg-dark'}`}
                                                onClick={() => setPaymentMethod('CASH')}
                                                style={{ cursor: 'pointer', transition: '0.2s' }}
                                            >
                                                <i className="bi bi-cash-coin me-2 text-success fs-4"></i> 
                                                <span className="fw-bold">Tiền mặt (Đến sân trả)</span>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div 
                                                className={`p-3 border rounded d-flex align-items-center justify-content-center cursor-pointer ${paymentMethod === 'VNPAY' ? 'border-warning bg-secondary' : 'border-secondary bg-dark'}`}
                                                onClick={() => setPaymentMethod('VNPAY')}
                                                style={{ cursor: 'pointer', transition: '0.2s' }}
                                            >
                                                <img 
                                                    src="https://vnpay.vn/assets/img/logo-primary.svg" 
                                                    alt="VNPAY" 
                                                    height="24" 
                                                    className="me-2"
                                                    onError={(e) => {e.target.style.display='none'}}
                                                />
                                                <span className="fw-bold text-primary">Ví VNPAY / Ngân hàng</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Label className="fw-bold text-warning mb-3">Chọn giờ bắt đầu:</Form.Label>
                                <div className="d-flex flex-wrap gap-2">
                                    {timeSlots.map((hour) => {
                                        const isOccupied = bookedHours.includes(hour);
                                        const isValid = isSlotValid(hour);
                                        const isSelected = selectedSlot === hour;

                                        // --- LOGIC MỚI: Check giờ quá khứ trong ngày ---
                                        const now = new Date();
                                        const currentHour = now.getHours();
                                        const isToday = selectedDate === getTodayString();
                                        
                                        // Nếu là hôm nay VÀ giờ nút nhỏ hơn hoặc bằng giờ hiện tại -> Disable
                                        const isPast = isToday && hour <= currentHour;
                                        // ----------------------------------------------

                                        const isDisabled = isOccupied || !isValid || isPast;

                                        return (
                                            <Button
                                                key={hour}
                                                // Nếu là quá khứ thì màu xám, nếu bị đặt thì màu đỏ
                                                variant={isSelected ? "warning" : (isOccupied ? "danger" : (isDisabled ? "secondary" : "outline-light"))}
                                                className={`py-2 px-3 fw-bold`}
                                                style={{ width: '80px', opacity: isDisabled ? 0.5 : 1 }}
                                                disabled={isDisabled}
                                                onClick={() => !isDisabled && setSelectedSlot(hour)}
                                            >
                                                {hour}:00
                                            </Button>
                                        );
                                    })}
                                </div>

                                <div className="mt-3 small text-white-50 d-flex gap-3">
                                    <span><i className="bi bi-square-fill text-light border border-secondary"></i> Trống</span>
                                    <span><i className="bi bi-square-fill text-warning"></i> Đang chọn</span>
                                    <span><i className="bi bi-square-fill text-danger"></i> Đã kín</span>
                                    <span><i className="bi bi-square-fill text-secondary"></i> Quá khứ / Không đủ giờ</span>
                                </div>

                                <hr className="border-secondary my-4" />

                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-dark p-3 rounded border border-secondary">
                                    <div className="mb-3 mb-md-0">
                                        <div className="text-white-50 small">Tổng thanh toán:</div>
                                        <div className="fs-4 fw-bold text-warning">
                                            {totalAmount.toLocaleString()}đ 
                                            <span className="fs-6 text-white text-muted ms-2">({duration} tiếng)</span>
                                        </div>
                                        {selectedSlot && (
                                            <div className="small text-light mt-1">
                                                <i className="bi bi-clock me-1"></i> 
                                                {selectedSlot}:00 - {selectedSlot + duration}:00
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant="warning"
                                        size="lg"
                                        className="px-5 fw-bold rounded-pill shadow"
                                        disabled={!selectedSlot || loading}
                                        onClick={handleBooking}
                                    >
                                        {loading ? "Đang xử lý..." : (paymentMethod === 'VNPAY' ? "THANH TOÁN NGAY" : "XÁC NHẬN ĐẶT")}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CourtDetailPage;