import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const PromoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=1920&q=80"
          alt="November Sale"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-background max-w-2xl mx-auto"
        >
          <p className="text-sm uppercase tracking-widest mb-3 text-background/80">
            Limited Time Offer
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-4">
            {t("promo.title")}
          </h2>
          <p className="text-lg md:text-xl text-background/80 mb-8">
            {t("promo.subtitle")}
          </p>
          <a
            href="/sale"
            className="inline-block bg-background text-foreground px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-background/90 transition-colors"
          >
            {t("promo.cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
