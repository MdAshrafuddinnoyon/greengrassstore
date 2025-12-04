import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const instagramImages = [
  "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
  "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80",
  "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80",
];

export const InstagramSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 mb-8 text-center">
        <a
          href="https://instagram.com/greengrass.ae"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors"
        >
          <Instagram className="w-5 h-5" />
          @greengrass.ae
        </a>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
        {instagramImages.map((image, index) => (
          <motion.a
            key={index}
            href="https://instagram.com/greengrass.ae"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden group"
          >
            <img
              src={image}
              alt={`Instagram post ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
