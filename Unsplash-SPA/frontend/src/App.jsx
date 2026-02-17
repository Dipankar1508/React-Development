import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./pages/AdminRoute";
import AdminGallery from "./admin/AdminGallery";
import AdminGalleryUpdate from "./admin/AdminGalleryUpdate";
import AdminHandleUser from "./admin/AdminHandleUser";
import NotFound from "./utils/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white">
      <Routes>
        <Route path="/" element={<Gallery />} />
        {/* <Route path="/admin" element={<AdminLogin />} /> */}
        <Route path="/admin" element={<AuthPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <AdminRoute>
              <AdminGallery />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/gallery/update/:id"
          element={
            <AdminRoute>
              <AdminGalleryUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminHandleUser />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
