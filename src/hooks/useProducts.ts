import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LocalProduct } from "@/components/products/LocalProductCard";

interface UseProductsOptions {
  category?: string;
  subcategory?: string;
  featured?: boolean;
  onSale?: boolean;
  isNew?: boolean;
  limit?: number;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true);

        if (options.category) {
          query = query.eq('category', options.category);
        }
        if (options.subcategory) {
          query = query.eq('subcategory', options.subcategory);
        }
        if (options.featured) {
          query = query.eq('is_featured', true);
        }
        if (options.onSale) {
          query = query.eq('is_on_sale', true);
        }
        if (options.isNew) {
          query = query.eq('is_new', true);
        }
        if (options.limit) {
          query = query.limit(options.limit);
        }

        query = query.order('created_at', { ascending: false });

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.category, options.subcategory, options.featured, options.onSale, options.isNew, options.limit]);

  return { products, loading, error };
};

export const useProduct = (slug: string) => {
  const [product, setProduct] = useState<LocalProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .maybeSingle();

        if (fetchError) throw fetchError;
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category')
          .eq('is_active', true);

        if (error) throw error;
        
        const uniqueCategories = [...new Set(data?.map(p => p.category) || [])];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};
