import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// Import thêm getAllCategories
import { searchCourts, getAllCategories } from '../../services/courtService';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const initialKeyword = searchParams.get('keyword') || '';
    
    const [keyword, setKeyword] = useState(initialKeyword);
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]); // State lưu danh mục thật
    const [loading, setLoading] = useState(false);

    // 1. Chạy khi load trang
    useEffect(() => {
        // Lấy danh mục thật từ API
        fetchCategories();

        // Nếu có keyword trên URL thì tìm kiếm
        const query = searchParams.get('keyword');
        if (query) {
            setKeyword(query);
            handleSearchApi(query);
        }
    }, [searchParams]);

    // Hàm lấy danh mục
    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error("Lỗi lấy danh mục:", error);
        }
    };

    // Hàm tìm kiếm sân
    const handleSearchApi = async (key) => {
        setLoading(true);
        try {
            const data = await searchCourts(key);
            setResults(data);
        } catch (error) {
            console.error(error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
        }
    };

    return (
        <div style={{ backgroundColor: '#1a1d20', minHeight: '100vh', paddingBottom: '50px' }}>
            
            {/* BREADCRUMB */}
            <div className="bg-dark py-3 border-bottom border-secondary">
                <Container>
                    <small className="text-white-50">
                        <Link to="/" className="text-decoration-none text-white-50 hover-text-warning">Trang chủ</Link> 
                        <span className="mx-2">/</span> 
                        <span className="text-white">Tìm kiếm</span>
                    </small>
                </Container>
            </div>

            <Container className="mt-4">
                {/* THANH TÌM KIẾM */}
                <div className="bg-dark p-4 rounded-3 shadow-sm mb-4" style={{ border: '1px solid #333' }}>
                    <Form onSubmit={handleFormSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className="bg-white border-0 text-secondary">
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control 
                                placeholder="Nhập tên sân, khu vực, loại sân (ví dụ: Sân 5)..." 
                                className="border-0 py-2 shadow-none"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            {keyword && (
                                <Button variant="light" onClick={() => setKeyword('')} className="border-0 text-secondary">
                                    <i className="bi bi-x-lg"></i>
                                </Button>
                            )}
                        </InputGroup>
                    </Form>
                    
                    {/* GỢI Ý (DỮ LIỆU THẬT) */}
                    <div className="d-flex align-items-center flex-wrap gap-2">
                        <small className="text-white-50 me-2 fw-bold">Gợi ý tìm nhanh:</small>
                        
                        {/* Map qua danh sách categories thật */}
                        {categories.map((cat) => (
                            <Badge 
                                key={cat.id} 
                                bg="secondary" 
                                className="fw-normal p-2 cursor-pointer hover-badge text-light"
                                onClick={() => navigate(`/search?keyword=${cat.name}`)}
                                style={{ cursor: 'pointer', border: '1px solid #444' }}
                            >
                                <i className="bi bi-tag-fill text-warning me-1"></i> {cat.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* KẾT QUẢ TÌM KIẾM */}
                <h5 className="text-white mb-4">
                    Kết quả tìm kiếm cho: <span className="text-warning">"{searchParams.get('keyword')}"</span>
                    <span className="ms-2 text-white-50 fs-6">({results.length} kết quả)</span>
                </h5>

                {loading ? (
                    <div className="text-center text-white py-5">
                        <div className="spinner-border text-warning" role="status"></div>
                        <p className="mt-2">Đang tìm kiếm sân...</p>
                    </div>
                ) : (
                    <>
                        {results.length > 0 ? (
                            <Row>
                                {results.map((court) => (
                                    <Col key={court.id} md={6} lg={4} className="mb-4">
                                        <Card className="h-100 border-0 shadow hover-card" style={{ backgroundColor: '#2c3035' }}>
                                            <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                                                <Card.Img variant="top" src={court.image} style={{ height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <Card.Body className="text-white">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <Card.Title className="fw-bold fs-5 text-warning">{court.name}</Card.Title>
                                                    {court.category && (
                                                        <Badge bg="secondary" className="fw-normal">{court.category.name}</Badge>
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
                                                    <h5 className="text-white fw-bold mb-0">
                                                        {court.pricePerHour ? court.pricePerHour.toLocaleString() : 0}đ
                                                        <span className="fs-6 fw-normal text-white-50">/h</span>
                                                    </h5>
                                                    <Button variant="warning" className="fw-bold px-4 rounded-pill shadow-sm">Đặt Ngay</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div className="text-center py-5 bg-dark rounded-3 border border-secondary">
                                <div className="mb-3">
                                    <i className="bi bi-search" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                                </div>
                                <h4 className="text-white fw-bold">Không tìm thấy kết quả nào</h4>
                                <p className="text-white-50">Hệ thống không tìm thấy sân hoặc danh mục phù hợp.</p>
                                <Button variant="outline-warning" onClick={() => navigate('/courts')} className="mt-2">
                                    Xem tất cả sân
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Container>

            <style>{`
                .hover-text-warning:hover { color: #ffc107 !important; }
                .hover-badge:hover { background-color: #ffc107 !important; color: #000 !important; }
                .hover-card:hover { transform: translateY(-5px); transition: all 0.3s ease; }
            `}</style>
        </div>
    );
};

export default SearchPage;