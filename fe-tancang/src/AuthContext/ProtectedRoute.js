// import React, { useState, useEffect, createContext, useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { getAuthConfig } from "./AuthConfigForm/authConfigApi";
// import { callApi } from "../services/api";
// import { API_AUTH_ME } from "@EnvironmentFile/constants/urlConfig";

// export const AuthContext = createContext();

// export const ProtectedRoute = ({ children }) => {
//   const [authType, setAuthType] = useState(null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         // ✅ 1. Lấy danh sách cấu hình xác thực từ BE
//         const configs = await getAuthConfig();
//         const list = Array.isArray(configs) ? configs : configs?.data || [];
//         const active = list.find((c) => c.isActive);
//         const type = active?.authType || "local";

//         logger.log("✅ Active auth type:", type);
//         setAuthType(type);

//         // ✅ 2. Xử lý xác thực theo từng loại
//         if (type === "keycloak") {
//           const data = await callApi("get", API_AUTH_ME, {}, {
//             withCredentials: true,
//           });
//           logger.log("✅ Keycloak /me:", data);
//           setUser(data.loggedIn ? data.user || data : null);
//         } else {
//           const token = localStorage.getItem("token_app");
//           if (token) {
//             const me = await callApi("get", "/api/auth/me");
//             setUser(me?.user || null);
//           } else {
//             setUser(null);
//           }
//         }
//       } catch (err) {
//         logger.error("❌ Auth init error:", err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     init();
//   }, []);

//   // ✅ Render logic kiểm tra
//   if (loading) {
//     return <div>Loading...</div>; // Hiển thị trong khi đang xác thực
//   }

//   const token = localStorage.getItem("token_app");

//   // ✅ Nếu không có token và không dùng keycloak → redirect về trang login
//   if (!token && authType !== "keycloak") {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ Nếu dùng keycloak mà chưa có user → redirect luôn
//   if (authType === "keycloak" && !user) {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ Nếu có user → cho phép truy cập
//   return (
//     <AuthContext.Provider value={{ user, loading, authType }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Hook tiện dụng để lấy context nhanh
// export const useAuth = () => useContext(AuthContext);

// export default ProtectedRoute;
// ProtectedRoute.js - PHIÊN BẢN TỐI GIẢN

import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "@components/Loading/Loading";
import { Navigate } from "react-router-dom";
import authService from "@services/AuthService";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <div>Loading...</div>;
//   const token = localStorage.getItem("token_app");
//   if (!token) {
//     // Nếu không có token, chắc chắn chưa đăng nhập, chuyển hướng về /login
//     window.location.href = "/login";
//   }

//   // Logic bảo vệ đúng: Nếu không có đối tượng user (chưa đăng nhập hoặc session hết hạn)
//   // thì chuyển hướng về trang đăng nhập.
//   // if (!user) {
//   //   return <Navigate to="/login" replace />;
//   // }

//   return children;
// };
const ProtectedRoute = ({ children }) => {
  const { user, loading, authConfig } = useContext(AuthContext);
  const currentPath = window.location.pathname;

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (currentPath === "/login") {
    return children;
  }

  // Nếu không có user, chuyển về trang login
  // LoginPage sẽ tự động xử lý redirect SSO nếu cần
  if (!user) {
    const token = authService.getToken();
    // Nếu có token mà chưa có user (đang revalidate), cứ để Loading hiển thị (ở trên đã check loading)
    // Nếu thực sự không có session, về /login
    if (!token && authConfig?.authType !== "keycloak") {
       return <Navigate to="/login" replace />;
    }
    
    // Với Keycloak, nếu không có user và không loading, nghĩa là chưa login
    if (authConfig?.authType === "keycloak") {
       return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
