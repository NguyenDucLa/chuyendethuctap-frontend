import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../../services/courtService';
import { toast } from 'react-toastify';

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCat, setEditingCat] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const data = await getAllCategories();
        // Sắp xếp ID tăng dần
        setCategories(data.sort((a, b) => a.id - b.id));
    };

    // Mở Modal Thêm
    const handleShowAdd = () => {
        setEditingCat(null);
        setName('');
        setShowModal(true);
    };

    // Mở Modal Sửa
    const handleShowEdit = (cat) => {
        setEditingCat(cat);
        setName(cat.name);
        setShowModal(true);
    };

    // Xử lý Lưu
    const handleSave = async () => {
        if (!name.trim()) {
            toast.warning("Tên danh mục không được để trống!");
            return;
        }

        try {
            if (editingCat) {
                await updateCategory(editingCat.id, { name });
                toast.success("Cập nhật thành công!");
            } else {
                await createCategory({ name });
                toast.success("Thêm mới thành công!");
            }
            setShowModal(false);
            fetchCategories();
        } catch (error) {
            toast.error("Có lỗi xảy ra.");
        }
    };

    // Xử lý Xóa
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
            try {
                await deleteCategory(id);
                toast.success("Đã xóa danh mục!");
                fetchCategories();
            } catch (error) {
                // Backend trả về lỗi 400 nếu danh mục đang có sân
                toast.error("Không thể xóa danh mục đang có chứa sân bóng!");
            }
        }
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#1a1d20', minHeight: '100vh' }}>
            <AdminSidebar />
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-white fw-bold">Quản Lý Danh Mục</h2>
                    <Button variant="warning" className="fw-bold" onClick={handleShowAdd}>
                        <i className="bi bi-plus-lg me-2"></i> Thêm Danh Mục
                    </Button>
                </div>

                <div className="bg-dark rounded shadow overflow-hidden" style={{ maxWidth: '800px' }}>
                    <Table hover variant="dark" className="mb-0 align-middle">
                        <thead className="bg-secondary text-warning">
                            <tr>
                                <th style={{ width: '100px' }}>ID</th>
                                <th>Tên Danh Mục</th>
                                <th className="text-end pe-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td>#{cat.id}</td>
                                    <td className="fw-bold">{cat.name}</td>
                                    <td className="text-end">
                                        <Button 
                                            variant="outline-primary" size="sm" className="me-2"
                                            onClick={() => handleShowEdit(cat)}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button 
                                            variant="outline-danger" size="sm"
                                            onClick={() => handleDelete(cat.id)}
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

            {/* MODAL */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="bg-dark text-white border-secondary">
                    <Modal.Title>{editingCat ? "Sửa Danh Mục" : "Thêm Danh Mục"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Form.Group>
                        <Form.Label>Tên danh mục</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="bg-secondary text-white border-0"
                            autoFocus
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="bg-dark border-secondary">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
                    <Button variant="warning" onClick={handleSave}>Lưu</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminCategoryPage;