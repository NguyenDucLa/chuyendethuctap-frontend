import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourtListPage = () => {
    const [courts, setCourts] = useState([]);

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const response = await api.get('/courts');
                setCourts(response.data);
            } catch (error) {
                toast.error("Lỗi tải danh sách sân!");
            }
        };
        fetchCourts();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-primary fw-bold text-center mb-4">🏟️ Danh Sách Tất Cả Sân Bóng</h2>
            
            <div className="row">
                {courts.map((court) => (
                    <div className="col-md-4 mb-4" key={court.id}>
                        <div className="card h-100 shadow border-0 hover-card">
                            <img 
                                src={court.imageUrl || "https://conhantaothanhthuong.com/wp-content/uploads/2021/04/thi-cong-san-bong-da-co-nhan-tao-tai-da-nang-6.jpg"} 
                                className="card-img-top" 
                                alt={court.name}
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{court.name}</h5>
                                <p className="text-muted"><i className="bi bi-geo-alt-fill"></i> {court.address}</p>
                                <h6 className="text-success fw-bold">{court.pricePerHour.toLocaleString()} đ/h</h6>
                            </div>
                            <div className="card-footer bg-white border-0 pb-3">
                                <Link to={`/booking/${court.id}`} className="btn btn-primary w-100 rounded-pill">
                                    Đặt Sân Ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourtListPage;