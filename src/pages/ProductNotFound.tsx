
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductNotFound = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="bg-muted rounded-full p-6 mb-6 shadow-lg">
          <Search className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
          {isArabic ? "المنتج غير موجود" : "Product Not Found"}
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          {isArabic
            ? "عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه. جرب البحث مرة أخرى أو استكشف مجموعاتنا الجديدة."
            : "Sorry, we couldn't find the product you were looking for.\nTry searching again or explore our latest collections."}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isArabic ? "العودة إلى المتجر" : "Back to Shop"}
        </Link>
      </motion.div>
    </div>
  );
};

export default ProductNotFound;
