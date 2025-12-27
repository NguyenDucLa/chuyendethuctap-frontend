import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Nhúng Bootstrap CSS vào đây
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-toastify/dist/ReactToastify.css'; // CSS cho thông báo
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Bọc App trong BrowserRouter để dùng chức năng chuyển trang */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)