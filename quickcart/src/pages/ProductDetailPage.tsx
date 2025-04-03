import { lazy, Suspense, useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "../types/Product";
import { useCartStore } from "../store/useCartStore";

const RelatedProducts = lazy(
  () => import("../features/recommendations/RelatedProducts")
);

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const taxIncludedPrice = useMemo(() => {
    if (!product) return null;
    return (product.price * 1.1).toFixed(2);
  }, [product]);

  if (loading || !product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain"
          loading="lazy"
        />

        <div className="flex flex-col flex-1">
          <h1 className="text-xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold">
            Price: ${product.price} (Tax included: ${taxIncludedPrice})
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Category: {product.category}
          </p>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Lazy loaded Related Products */}
      <Suspense
        fallback={<div className="mt-10">Loading related products…</div>}
      >
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </Suspense>
    </div>
  );
}
