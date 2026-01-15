import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import AdminSidebar from '../../components/AdminSidebar';
import { getAllUsers, deleteUser } from '../../services/userService';
import { toast } from 'react-toastify';

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getAllUsers();
        const sortedData = data.sort((a, b) => b.id - a.id);
        setUsers(sortedData);
        setFilteredUsers(sortedData);
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        setSearch(keyword);
        const filtered = users.filter(u => 
            u.fullName?.toLowerCase().includes(keyword) || 
            u.email?.toLowerCase().includes(keyword) ||
            u.phone?.includes(keyword)
        );
        setFilteredUsers(filtered);
    };

    const handleDelete = async (id, role) => {
        if (role === 'ADMIN') {
            toast.warning("Không thể xóa tài khoản Admin!");
            return;
        }
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            try {
                await deleteUser(id);
                toast.success("Đã xóa người dùng thành công!");
                fetchUsers();
            } catch (error) {
                toast.error("Lỗi: Không thể xóa (User này đang có đơn đặt sân).");
            }
        }
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#1a1d20', minHeight: '100vh' }}>
            <AdminSidebar />
            
            <div className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-white fw-bold">Quản Lý Người Dùng</h2>
                    
                    <div className="d-flex gap-3">
                        <div style={{ width: '250px' }}>
                            <InputGroup>
                                <InputGroup.Text className="bg-dark text-secondary border-secondary">
                                    <i className="bi bi-search"></i>
                                </InputGroup.Text>
                                <Form.Control 
                                    placeholder="Tìm tên, email, sđt..." 
                                    className="bg-dark text-white border-secondary"
                                    value={search}
                                    onChange={handleSearch}
                                />
                            </InputGroup>
                        </div>

                        {/* NÚT THÊM: Chuyển hướng sang trang Register với chế độ admin */}
                        <Button 
                            as={Link} 
                            to="/register?mode=admin" 
                            variant="warning" 
                            className="fw-bold"
                        >
                            <i className="bi bi-person-plus-fill me-2"></i> Thêm User
                        </Button>
                    </div>
                </div>

                <div className="bg-dark rounded shadow overflow-hidden">
                    <Table hover variant="dark" className="mb-0 align-middle">
                        <thead className="bg-secondary text-warning">
                            <tr>
                                <th>ID</th>
                                <th>Họ và Tên</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Địa chỉ</th>
                                <th>Vai trò</th>
                                <th className="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>#{user.id}</td>
                                    <td className="fw-bold">{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || '-'}</td>
                                    <td>{user.address || '-'}</td>
                                    <td>
                                        {user.role === 'ADMIN' ? (
                                            <Badge bg="danger">ADMIN</Badge>
                                        ) : (
                                            <Badge bg="success">USER</Badge>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm"
                                            disabled={user.role === 'ADMIN'}
                                            onClick={() => handleDelete(user.id, user.role)}
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
        </div>
    );
};

export default AdminUserPage;