import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  id: string;
  titleKey: string;
  descKey: string;
  image: string;
  href: string;
  featured?: boolean;
}

const categories: Category[] = [
  {
    id: "plants",
    titleKey: "section.plants",
    descKey: "section.plants.desc",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80",
    href: "/plants",
    featured: true,
  },
  {
    id: "pots",
    titleKey: "section.pots",
    descKey: "section.pots.desc",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
    href: "/pots",
  },
  {
    id: "planters",
    titleKey: "section.planters",
    descKey: "section.planters.desc",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80",
    href: "/planters",
  },
  {
    id: "vases",
    titleKey: "section.vases",
    descKey: "section.vases.desc",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
    href: "/vases",
  },
  {
    id: "homecare",
    titleKey: "section.homecare",
    descKey: "section.homecare.desc",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    href: "/homecare",
  },
];

export const CategorySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-subtitle mb-2">Shop by Category</p>
          <h2 className="section-title">Our Collections</h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="category-card group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={category.image}
                  alt={t(category.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-display text-xl md:text-2xl text-background mb-1">
                    {t(category.titleKey)}
                  </h3>
                  <p className="text-background/70 text-xs md:text-sm mb-2 hidden md:block">
                    {t(category.descKey)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-background text-xs uppercase tracking-wider opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {t("cta.shopAll")}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
