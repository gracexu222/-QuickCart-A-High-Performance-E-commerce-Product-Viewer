import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProductListPage from "./pages/ProductListPage";
import CartSidebar from "./components/CartSidebar";

// Lazy load the detail page!
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

export default function App() {
  return (
    <div className="flex">
      {/* Sidebar visible across all pages */}
      <CartSidebar />

      {/* Main content area */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route
            path="/product/:id"
            element={
              <Suspense
                fallback={<div className="p-6">Loading product details…</div>}
              >
                <ProductDetailPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
