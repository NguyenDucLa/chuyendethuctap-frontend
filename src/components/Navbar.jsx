import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Thư viện vừa cài
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userRole = null;
    let userName = null;
   
    

    // Nếu có token thì giải mã để lấy Role và Tên
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded.authorities ? decoded.authorities[0] : null; // Lấy quyền
            userName = decoded.fullName || decoded.sub;
        } catch (error) {
            console.error("Lỗi token", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token'); // Xóa token
        toast.info("Đã đăng xuất");
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow px-4">
            <Link className="navbar-brand fw-bold fs-4" to="/">
                ⚽ Đặt Sân Bóng
            </Link>

            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link text-white fw-semibold" to="/">Trang Chủ</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white fw-semibold" to="/courts">Danh Sách Sân</Link>
                    </li>
                    {!token ? (
                        // Chưa đăng nhập thì hiện nút Login và Register
                        <>
                            <li className="nav-item ms-2">
                                <Link className="btn btn-outline-light rounded-pill px-3" to="/login">
                                    🔐 Đăng Nhập
                                </Link>
                            </li>
                            <li className="nav-item ms-2">
                                <Link className="btn btn-light text-primary rounded-pill px-3 fw-bold" to="/register">
                                    📝 Đăng Ký
                                </Link>
                            </li>
                        </>
                    ) : (
                        // Đã đăng nhập
                        <>
                            {/* Chỉ Admin mới thấy nút này */}
                            {userRole === 'ADMIN' && (
                                <>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle text-warning fw-bold" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            ⚙️ Quản Lý
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                                            <li><Link className="dropdown-item" to="/admin/courts">🏟️ Quản lý Sân</Link></li>
                                            <li><Link className="dropdown-item" to="/admin/bookings">📅 Quản lý Đơn</Link></li>
                                        </ul>
                                    </li>
                                </>
                            )}

                            <li className="nav-item">
                                <Link className="nav-link text-white fw-semibold" to="/my-bookings">
                                    📜 Lịch Sử Đặt
                                </Link>
                            </li>

                            <li className="nav-item ms-3 text-white fw-semibold">
                                Xin chào {userName}
                            </li>

                            <li className="nav-item ms-2">
                                <button onClick={handleLogout} className="btn btn-danger rounded-pill px-3">
                                    🚪 Đăng Xuất
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;