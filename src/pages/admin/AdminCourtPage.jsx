import { useEffect, useState } from 'react';
import api from '../../services/api'; // Lưu ý: lên 2 cấp thư mục (../../)
import { toast } from 'react-toastify';

const AdminCourtPage = () => {
    const [courts, setCourts] = useState([]);
    const [newCourt, setNewCourt] = useState({ name: '', address: '', pricePerHour: '', imageUrl: '' });

    const fetchCourts = async () => {
        try {
            const response = await api.get('/courts');
            setCourts(response.data);
        } catch (error) {
            toast.error("Lỗi tải danh sách sân!");
        }
    };

    useEffect(() => { fetchCourts(); }, []);

    const handleAddCourt = async (e) => {
        e.preventDefault();
        try {
            await api.post('/courts', newCourt);
            toast.success("Thêm sân thành công!");
            fetchCourts();
            setNewCourt({ name: '', address: '', pricePerHour: '', imageUrl: '' });
        } catch (error) {
            toast.error("Lỗi thêm sân!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa sân này?")) {
            try {
                await api.delete(`/courts/${id}`);
                fetchCourts();
                toast.success("Đã xóa!");
            } catch (error) { toast.error("Xóa lỗi!"); }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-danger fw-bold border-bottom pb-2">⚙️ Admin Dashboard - Quản Lý Sân</h2>
            
            {/* Form thêm nhanh */}
            <div className="card my-4 p-3 bg-light shadow-sm">
                <form onSubmit={handleAddCourt} className="row g-2">
                    <div className="col-md-4"><input className="form-control" placeholder="Tên sân" value={newCourt.name} onChange={e=>setNewCourt({...newCourt, name: e.target.value})} required/></div>
                    <div className="col-md-4"><input className="form-control" placeholder="Địa chỉ" value={newCourt.address} onChange={e=>setNewCourt({...newCourt, address: e.target.value})} required/></div>
                    <div className="col-md-2"><input type="number" className="form-control" placeholder="Giá" value={newCourt.pricePerHour} onChange={e=>setNewCourt({...newCourt, pricePerHour: e.target.value})} required/></div>
                    <div className="col-md-2"><button className="btn btn-primary w-100">Thêm Mới</button></div>
                </form>
            </div>

            {/* Bảng dữ liệu */}
            <table className="table table-striped table-hover border">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th><th>Tên Sân</th><th>Địa Chỉ</th><th>Giá/Giờ</th><th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {courts.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.address}</td>
                            <td>{c.pricePerHour.toLocaleString()} đ</td>
                            <td><button onClick={() => handleDelete(c.id)} className="btn btn-danger btn-sm">Xóa</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminCourtPage;