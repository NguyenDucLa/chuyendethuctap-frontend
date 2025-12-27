import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer

// 👇 Import các pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminCourtPage from './pages/admin/AdminCourtPage';
import HomePage from './pages/client/HomePage';
import BookingHistoryPage from './pages/client/BookingHistoryPage';
import BookingPage from './pages/client/BookingPage';
import AdminBookingPage from './pages/admin/AdminBookingPage'; 
import CourtListPage from './pages/client/CourtListPage';

function App() {
  return (
    // Class min-vh-100 để đảm bảo trang web luôn cao ít nhất bằng màn hình
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Navbar />

      {/* 👇 Thêm 'flex-grow-1' để phần nội dung tự giãn ra, đẩy Footer xuống đáy */}
      <div className="container-fluid p-0 flex-grow-1">
        <Routes>
          {/* 1. Các trang Public / Client */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courts" element={<CourtListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<BookingHistoryPage />} />

          {/* 2. Các trang Admin */}
          <Route path="/admin/courts" element={<AdminCourtPage />} />
          <Route path="/admin/bookings" element={<AdminBookingPage />} />
        </Routes>
      </div>

      {/* 👇 Đặt Footer ở đây, nằm ngoài phần nội dung */}
      <Footer />
    </div>
  );
}

export default App;