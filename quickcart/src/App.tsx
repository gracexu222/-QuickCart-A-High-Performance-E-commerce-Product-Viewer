import { Routes, Route, Navigate } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
