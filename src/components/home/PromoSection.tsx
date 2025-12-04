import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import gardenFlowers from "@/assets/garden-flowers.jpg";

export const PromoSection = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <img
        src={gardenFlowers}
        alt="Sale"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-lg text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-red-400" />
              <p className="text-xs uppercase tracking-widest text-red-400 font-semibold">
                Limited Time Offer
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-4">
              Special Sale
            </h2>
            <p className="text-white/80 mb-6 text-sm md:text-base">
              Up to 40% off on selected plants, pots, and accessories. Don't miss out on these amazing deals!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop?category=sale"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-white/90 transition-colors"
              >
                Shop Sale
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/50 px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
