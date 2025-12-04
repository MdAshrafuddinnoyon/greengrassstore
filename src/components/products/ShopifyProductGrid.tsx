import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ShopifyProductCard } from "./ShopifyProductCard";
import { Loader2 } from "lucide-react";

interface ShopifyProductGridProps {
  title?: string;
  subtitle?: string;
  query?: string;
  limit?: number;
}

export const ShopifyProductGrid = ({ title, subtitle, query, limit = 12 }: ShopifyProductGridProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(limit, query);
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [query, limit]);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-xl font-medium text-gray-900 mb-8">{title}</h2>
          )}
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#2d5a3d]" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-xl font-medium text-gray-900 mb-8">{title}</h2>
          )}
          <div className="text-center py-12 text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-xl font-medium text-gray-900 mb-8">{title}</h2>
          )}
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-2">No products found</p>
            <p className="text-sm text-gray-400">
              Tell us what products you'd like to add to your store!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ShopifyProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
