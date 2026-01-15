import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// --- 1. IMPORT TOASTIFY ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import ProtectedRoute from './components/ProtectedRoute'; // Import bảo vệ Admin

// Client Pages
import HomePage from './pages/client/HomePage';
import CourtListPage from './pages/client/CourtListPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BookingHistoryPage from './pages/client/BookingHistoryPage';
import DashboardPage from './pages/client/DashboardPage';
import SettingsPage from './pages/client/SettingsPage';
import SearchPage from './pages/client/SearchPage';
import CourtDetailPage from './pages/client/CourtDetailPage';
import PaymentSuccessPage from './pages/client/PaymentSuccessPage';
import PaymentFailedPage from './pages/client/PaymentFailedPage';
import ContactPage from './pages/client/ContactPage';


// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContactPage from './pages/admin/AdminContactPage';
import AdminCourtPage from './pages/admin/AdminCourtPage';
import AdminBookingPage from './pages/admin/AdminBookingPage';
import AdminUserPage from './pages/admin/AdminUserPage';
import AdminCategoryPage from './pages/admin/AdminCategoryPage';

// --- COMPONENT NỘI DUNG CHÍNH (Để dùng được useLocation) ---
function AppContent() {
  const location = useLocation();

  // Kiểm tra xem đường dẫn hiện tại có bắt đầu bằng "/admin" không
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Chỉ hiện Navbar Khách hàng nếu KHÔNG phải trang Admin */}
      {!isAdminRoute && <MyNavbar />}

      <div className="flex-grow-1">
        <Routes>
          {/* --- ROUTES KHÁCH HÀNG --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courts" element={<CourtListPage />} />
          <Route path="/courts/:id" element={<CourtDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<BookingHistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-failed" element={<PaymentFailedPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* --- ROUTES ADMIN (Được bảo vệ) --- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminContactPage /></ProtectedRoute>} />
          <Route path="/admin/courts" element={<ProtectedRoute><AdminCourtPage /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookingPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminUserPage /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><AdminCategoryPage /></ProtectedRoute>} />
          {/* Sau này thêm các route con của admin ở đây */}

        </Routes>
      </div>

      {/* Chỉ hiện Footer Khách hàng nếu KHÔNG phải trang Admin */}
      {!isAdminRoute && <MyFooter />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

// --- COMPONENT GỐC ---
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;