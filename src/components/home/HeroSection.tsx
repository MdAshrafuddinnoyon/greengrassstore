import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[450px] max-h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1545165375-8a144c17f8e5?w=1920&q=80"
          alt="Plants collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-background font-normal leading-tight mb-4">
                {t("hero.title")}
              </h1>
              <p className="text-background/80 text-lg mb-8">
                {t("hero.subtitle")}
              </p>
              <a
                href="/shop"
                className="inline-block bg-background text-foreground px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-background/90 transition-colors"
              >
                {t("hero.cta")}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
