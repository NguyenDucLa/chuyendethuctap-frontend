import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const role = localStorage.getItem("userRole");

    // Nếu không phải ADMIN thì đá về trang chủ
    if (role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;