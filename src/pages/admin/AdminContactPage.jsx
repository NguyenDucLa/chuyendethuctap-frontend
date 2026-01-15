import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import { getAllContacts } from '../../services/contactService';

const AdminContactPage = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllContacts();
            setContacts(data);
        };
        fetchData();
    }, []);

    return (
        <div className="d-flex" style={{ backgroundColor: '#1a1d20', minHeight: '100vh' }}>
            <AdminSidebar />
            <div className="flex-grow-1 p-4">
                <h2 className="text-white fw-bold mb-4">Quản Lý Phản Hồi</h2>
                <Card className="border-0 shadow">
                    <Card.Body className="p-0">
                        <Table hover responsive variant="dark" className="mb-0">
                            <thead className="bg-secondary text-warning">
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Tiêu đề</th>
                                    <th>Nội dung</th>
                                    <th>Ngày gửi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact.id}>
                                        <td>{contact.id}</td>
                                        <td className="fw-bold">{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.title}</td>
                                        <td>{contact.message}</td>
                                        <td>{new Date(contact.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default AdminContactPage;