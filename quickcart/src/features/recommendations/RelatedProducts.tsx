import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import ProductCard from "../../components/ProductCard";

type Props = {
  category: string;
  currentProductId: number;
};

export default function RelatedProducts({ category, currentProductId }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await res.json();
      const filtered = data.filter((p: Product) => p.id !== currentProductId);
      setProducts(filtered);
      setLoading(false);
    };
    fetchRelated();
  }, [category, currentProductId]);

  if (loading) return <p>Loading related products...</p>;

  if (!products.length) return <p>No related products found.</p>;

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
