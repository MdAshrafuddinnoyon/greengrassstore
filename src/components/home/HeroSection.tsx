import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import gardenFlowers from "@/assets/garden-flowers.jpg";
import heroChair from "@/assets/hero-chair.jpg";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Background Image - Garden Scene */}
      <div className="absolute inset-0">
        <img
          src={gardenFlowers}
          alt="Garden plants background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a3a2a]/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Text */}
        <div className="text-center pt-8 pb-4">
          <p className="text-white/80 text-xs md:text-sm tracking-wide">
            Plants, Planters & Pots Online Store to beautify homes!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 items-end pb-0">
          {/* Left Side - PLANTS Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white py-8 md:py-12"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 block mb-2">
              PLANTS
            </span>
            <div className="w-12 h-0.5 bg-white/40 mb-4" />
            <p className="text-white/70 text-sm max-w-xs leading-relaxed mb-6">
              Curated collection of indoor and outdoor plants perfect for Dubai's climate. Transform your space with our premium selection.
            </p>
            <a
              href="/plants"
              className="inline-block bg-white text-gray-900 px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-gray-100 transition-colors"
            >
              {t("hero.cta")}
            </a>
          </motion.div>

          {/* Right Side - Orange Chair */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center md:justify-end items-end"
          >
            <div className="relative w-full max-w-[300px] md:max-w-[380px]">
              <img
                src={heroChair}
                alt="Modern orange wicker armchair"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
