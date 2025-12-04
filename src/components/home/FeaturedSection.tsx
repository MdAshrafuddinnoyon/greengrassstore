import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeaturedSectionProps {
  layout: "left" | "right";
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgColor?: string;
}

export const FeaturedSection = ({
  layout,
  image,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  bgColor = "bg-secondary",
}: FeaturedSectionProps) => {
  return (
    <section className={bgColor}>
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-8 items-center py-12 md:py-0 ${
            layout === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: layout === "left" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={layout === "right" ? "md:order-2" : ""}
          >
            <div className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: layout === "left" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={`py-8 md:py-16 ${layout === "right" ? "md:order-1" : ""}`}
          >
            <p className="section-subtitle mb-2">{subtitle}</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {description}
            </p>
            <a href={ctaLink} className="btn-outline inline-block">
              {ctaText}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
