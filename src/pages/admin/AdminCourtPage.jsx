import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Image, Modal, Form, Row, Col } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllCourts, deleteCourt, createCourt, updateCourt, getAllCategories } from '../../services/courtService';
import { toast } from 'react-toastify';

const AdminCourtPage = () => {
    const [courts, setCourts] = useState([]);
    const [categories, setCategories] = useState([]); // Danh sách loại sân để chọn
    
    // State cho Modal
    const [showModal, setShowModal] = useState(false);
    const [editingCourt, setEditingCourt] = useState(null); // Nếu null là Thêm, có data là Sửa
    
    // Form Data
    const [formData, setFormData] = useState({
        name: '', location: '', description: '', pricePerHour: '', image: '', categoryId: ''
    });

    useEffect(() => {
        fetchCourts();
        fetchCategories();
    }, []);

    const fetchCourts = async () => {
        const data = await getAllCourts();
        setCourts(data);
    };

    const fetchCategories = async () => {
        const data = await getAllCategories();
        setCategories(data);
    };

    // Mở Modal Thêm mới
    const handleShowAdd = () => {
        setEditingCourt(null);
        setFormData({ name: '', location: '', description: '', pricePerHour: '', image: '', categoryId: '' });
        setShowModal(true);
    };

    // Mở Modal Sửa
    const handleShowEdit = (court) => {
        setEditingCourt(court);
        setFormData({
            name: court.name,
            location: court.location,
            description: court.description,
            pricePerHour: court.pricePerHour,
            image: court.image,
            categoryId: court.category ? court.category.id : ''
        });
        setShowModal(true);
    };

    // Xử lý Xóa
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sân này không?")) {
            try {
                await deleteCourt(id);
                toast.success("Đã xóa sân thành công!");
                fetchCourts();
            } catch (error) {
                toast.error("Lỗi: Không thể xóa sân (có thể do sân đang có lịch đặt).");
            }
        }
    };

    // Xử lý Lưu (Thêm hoặc Sửa)
    const handleSave = async () => {
        try {
            if (editingCourt) {
                // Sửa
                await updateCourt(editingCourt.id, formData);
                toast.success("Cập nhật sân thành công!");
            } else {
                // Thêm mới
                await createCourt(formData);
                toast.success("Thêm sân mới thành công!");
            }
            setShowModal(false);
            fetchCourts(); // Load lại danh sách
        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#1a1d20', minHeight: '100vh' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-white fw-bold">Quản Lý Sân Bóng</h2>
                    <Button variant="warning" className="fw-bold" onClick={handleShowAdd}>
                        <i className="bi bi-plus-lg me-2"></i> Thêm sân mới
                    </Button>
                </div>

                <div className="bg-dark rounded shadow overflow-hidden">
                    <Table hover variant="dark" className="mb-0 align-middle">
                        <thead className="bg-secondary text-warning">
                            <tr>
                                <th>ID</th>
                                <th>Hình ảnh</th>
                                <th>Tên sân</th>
                                <th>Loại sân</th>
                                <th>Giá/giờ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courts.map((court) => (
                                <tr key={court.id}>
                                    <td>#{court.id}</td>
                                    <td>
                                        <Image 
                                            src={court.image} 
                                            rounded 
                                            style={{ width: '60px', height: '40px', objectFit: 'cover' }} 
                                        />
                                    </td>
                                    <td className="fw-bold">{court.name}</td>
                                    <td>
                                        {court.category ? (
                                            <Badge bg="info" text="dark">{court.category.name}</Badge>
                                        ) : (
                                            <Badge bg="secondary">Chưa phân loại</Badge>
                                        )}
                                    </td>
                                    <td className="text-success fw-bold">
                                        {court.pricePerHour?.toLocaleString()}đ
                                    </td>
                                    <td>
                                        <Button 
                                            variant="outline-primary" size="sm" className="me-2"
                                            onClick={() => handleShowEdit(court)}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button 
                                            variant="outline-danger" size="sm"
                                            onClick={() => handleDelete(court.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* --- MODAL THÊM / SỬA --- */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton className="bg-dark text-white border-secondary">
                    <Modal.Title>{editingCourt ? "Cập Nhật Sân" : "Thêm Sân Mới"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên sân</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Loại sân</Form.Label>
                                    <Form.Select 
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                                        className="bg-secondary text-white border-0"
                                    >
                                        <option value="">-- Chọn loại sân --</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Vị trí</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="bg-secondary text-white border-0"
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Giá thuê (VNĐ/giờ)</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        value={formData.pricePerHour}
                                        onChange={(e) => setFormData({...formData, pricePerHour: e.target.value})}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Link hình ảnh</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={formData.image}
                                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                                        className="bg-secondary text-white border-0"
                                        placeholder="https://..."
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control 
                                as="textarea" rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="bg-secondary text-white border-0"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-dark border-secondary">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
                    <Button variant="warning" onClick={handleSave}>
                        {editingCourt ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminCourtPage;