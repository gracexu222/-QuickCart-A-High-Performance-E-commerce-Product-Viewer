import { Product } from "../types/Product";
import { useCartStore } from "../store/useCartStore";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="h-48 w-full object-contain mb-2"
      />
      <h2 className="text-sm font-semibold">{product.title}</h2>
      <p className="text-gray-500 mb-2">${product.price.toFixed(2)}</p>
      <button
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
