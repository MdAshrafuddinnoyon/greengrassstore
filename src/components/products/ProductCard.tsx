import { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  badge?: "sale" | "new" | "soldOut";
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { t, language } = useLanguage();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const displayName = language === "ar" && product.nameAr ? product.nameAr : product.name;

  return (
    <div
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={displayName}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered && product.hoverImage ? "opacity-0" : "opacity-100"
          )}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={displayName}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2 py-1 text-[10px] uppercase tracking-wider font-medium",
              product.badge === "sale" && "bg-red-500 text-white",
              product.badge === "new" && "bg-foreground text-background",
              product.badge === "soldOut" && "bg-muted text-muted-foreground"
            )}
          >
            {product.badge === "sale" && `-${discount}%`}
            {product.badge === "new" && t("product.new")}
            {product.badge === "soldOut" && t("product.soldOut")}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-3 flex gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-foreground text-background text-xs uppercase tracking-wider font-medium hover:bg-foreground/90 transition-colors"
            disabled={product.badge === "soldOut"}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {t("product.addToCart")}
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-background hover:bg-muted transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
          {displayName}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {t("common.currency")} {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {t("common.currency")} {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
