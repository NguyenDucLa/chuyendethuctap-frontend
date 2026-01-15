import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // <--- QUAN TRỌNG: Đã thêm dòng này
import { getAllCourts, getAllCategories } from '../../services/courtService';

const CourtListPage = () => {
    const [courts, setCourts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [courtsData, categoriesData] = await Promise.all([
                getAllCourts(null),
                getAllCategories()
            ]);
            setCourts(courtsData || []);
            setCategories(categoriesData || []);
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = async (categoryId) => {
        setSelectedCategory(categoryId);
        setLoading(true);
        const data = await getAllCourts(categoryId);
        setCourts(data || []);
        setLoading(false);
    };

    return (
        <div style={{ backgroundColor: '#1a1d20', minHeight: '100vh', paddingBottom: '50px' }}>
            
            {/* HEADER DANH MỤC */}
            <div className="bg-dark py-3 shadow-sm mb-4 border-bottom border-secondary sticky-top" style={{ zIndex: 100 }}>
                <Container>
                    <div className="d-flex justify-content-center gap-2 overflow-auto py-2">
                        <Button
                            variant={selectedCategory === null ? "warning" : "outline-secondary"}
                            className={`rounded-pill px-4 fw-bold ${selectedCategory === null ? "text-dark" : "text-light"}`}
                            onClick={() => handleFilter(null)}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            TẤT CẢ
                        </Button>

                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant={selectedCategory === cat.id ? "warning" : "outline-secondary"}
                                className={`rounded-pill px-4 fw-bold ${selectedCategory === cat.id ? "text-dark" : "text-light"}`}
                                onClick={() => handleFilter(cat.id)}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {cat.name.toUpperCase()}
                            </Button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* DANH SÁCH SÂN */}
            <Container>
                {loading ? (
                    <div className="text-center text-white mt-5">
                        <div className="spinner-border text-warning" role="status"></div>
                    </div>
                ) : (
                    <Row>
                        {courts.length > 0 ? (
                            courts.map((court) => (
                                <Col key={court.id} md={6} lg={4} className="mb-4">
                                    <Card className="h-100 border-0 shadow hover-card" style={{ backgroundColor: '#2c3035' }}>
                                        <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                                            <Card.Img 
                                                variant="top" 
                                                src={court.image} 
                                                style={{ height: '100%', objectFit: 'cover', transition: '0.3s' }}
                                                className="court-img"
                                            />
                                            <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-3 px-3 py-2 fw-bold">
                                                HOT
                                            </Badge>
                                        </div>

                                        <Card.Body className="text-white">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <Card.Title className="fw-bold fs-5 text-warning">{court.name}</Card.Title>
                                                {court.category && (
                                                    <Badge bg="secondary" className="fw-normal">
                                                        {court.category.name}
                                                    </Badge>
                                                )}
                                            </div>
                                            
                                            <Card.Text className="text-light opacity-75 small mb-3 text-truncate">
                                                <i className="bi bi-info-circle me-1"></i> {court.description}
                                            </Card.Text>

                                            <div className="d-flex align-items-center mb-3 text-white-50">
                                                <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                                                <small>{court.location}</small>
                                            </div>

                                            <hr style={{ borderColor: '#555' }} />

                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <div>
                                                    <span className="text-white-50 small">Giá thuê:</span>
                                                    <h5 className="text-white fw-bold mb-0">
                                                        {court.pricePerHour ? court.pricePerHour.toLocaleString() : 0}đ
                                                        <span className="fs-6 fw-normal text-white-50">/h</span>
                                                    </h5>
                                                </div>
                                                {/* Nút đặt ngay chuyển hướng sang trang chi tiết */}
                                                <Button 
                                                    as={Link} 
                                                    to={`/courts/${court.id}`}
                                                    variant="warning" 
                                                    className="fw-bold px-4 rounded-pill shadow-sm"
                                                >
                                                    Đặt Ngay
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <div className="text-center text-white-50 mt-5">
                                <h4>😢 Chưa có sân nào thuộc danh mục này</h4>
                            </div>
                        )}
                    </Row>
                )}
            </Container>

            <style>{`
                .hover-card:hover { transform: translateY(-5px); transition: all 0.3s ease; }
                .hover-card:hover .court-img { transform: scale(1.1); }
            `}</style>
        </div>
    );
};

export default CourtListPage;