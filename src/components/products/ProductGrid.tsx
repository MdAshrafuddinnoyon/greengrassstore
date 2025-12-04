import { motion } from "framer-motion";
import { ProductCard, Product } from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export const ProductGrid = ({ title, subtitle, products, viewAllLink }: ProductGridProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            {subtitle && (
              <p className="section-subtitle mb-1">{subtitle}</p>
            )}
            <h2 className="font-display text-2xl md:text-3xl font-normal">{title}</h2>
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider font-medium hover:text-primary transition-colors"
            >
              {t("cta.viewMore")}
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        {viewAllLink && (
          <div className="mt-8 text-center md:hidden">
            <a
              href={viewAllLink}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium hover:text-primary transition-colors"
            >
              {t("cta.viewMore")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
