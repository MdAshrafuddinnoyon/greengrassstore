import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSlide {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  buttonText: string;
  buttonTextAr: string;
  buttonLink: string;
  backgroundImage: string;
  order: number;
}

interface HeroSliderSettings {
  enabled: boolean;
  autoPlay: boolean;
  autoPlayInterval: number;
  slides: HeroSlide[];
}

export const HeroSection = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [settings, setSettings] = useState<HeroSliderSettings | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('setting_key', 'hero_slider')
          .maybeSingle();

        if (error) throw error;
        
        if (data?.setting_value) {
          setSettings(data.setting_value as unknown as HeroSliderSettings);
        } else {
          // Use default settings if no data
          setSettings({
            enabled: true,
            autoPlay: true,
            autoPlayInterval: 5000,
            slides: [{
              id: '1',
              title: 'Bring Nature',
              titleAr: 'أحضر الطبيعة',
              subtitle: 'Into Your Home',
              subtitleAr: 'إلى منزلك',
              description: 'Discover our premium collection of plants, pots, and home décor designed for UAE homes.',
              descriptionAr: 'اكتشف مجموعتنا المميزة من النباتات والأواني وديكور المنزل المصممة لمنازل الإمارات.',
              buttonText: 'Shop Now',
              buttonTextAr: 'تسوق الآن',
              buttonLink: '/shop',
              backgroundImage: '',
              order: 1
            }]
          });
        }
      } catch (error) {
        console.error('Error fetching hero settings:', error);
        // Set default on error
        setSettings({
          enabled: true,
          autoPlay: true,
          autoPlayInterval: 5000,
          slides: [{
            id: '1',
            title: 'Bring Nature',
            titleAr: 'أحضر الطبيعة',
            subtitle: 'Into Your Home',
            subtitleAr: 'إلى منزلك',
            description: 'Discover our premium collection of plants, pots, and home décor.',
            descriptionAr: 'اكتشف مجموعتنا المميزة من النباتات والأواني.',
            buttonText: 'Shop Now',
            buttonTextAr: 'تسوق الآن',
            buttonLink: '/shop',
            backgroundImage: '',
            order: 1
          }]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('hero-slider-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'site_settings',
        filter: 'setting_key=eq.hero_slider'
      }, (payload) => {
        if (payload.new && (payload.new as any).setting_value) {
          setSettings((payload.new as any).setting_value as HeroSliderSettings);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!settings?.autoPlay || !settings?.slides || settings.slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % settings.slides.length);
    }, settings.autoPlayInterval || 5000);

    return () => clearInterval(interval);
  }, [settings?.autoPlay, settings?.autoPlayInterval, settings?.slides?.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    if (!settings?.slides) return;
    setCurrentSlide((prev) => (prev + 1) % settings.slides.length);
  }, [settings?.slides]);

  const prevSlide = useCallback(() => {
    if (!settings?.slides) return;
    setCurrentSlide((prev) => (prev - 1 + settings.slides.length) % settings.slides.length);
  }, [settings?.slides]);

  if (loading) {
    return (
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden bg-muted animate-pulse" />
    );
  }

  if (!settings?.enabled || !settings?.slides || settings.slides.length === 0) {
    return null;
  }

  const slide = settings.slides[currentSlide];
  const title = isArabic ? slide.titleAr : slide.title;
  const subtitle = isArabic ? slide.subtitleAr : slide.subtitle;
  const description = isArabic ? slide.descriptionAr : slide.description;
  const buttonText = isArabic ? slide.buttonTextAr : slide.buttonText;
  const backgroundImage = slide.backgroundImage || heroBg;

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={backgroundImage}
            alt="Premium plants collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {settings.slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 z-20 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 z-20 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.span
            key={`brand-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-white/80 text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-medium"
          >
            Green Grass Store
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.1] mb-6">
                {title}
                <br />
                <span className="text-[#c9a87c]">{subtitle}</span>
              </h1>

              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg font-light">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white hover:bg-white/90 text-gray-900 px-8 py-6 text-base font-medium rounded-lg"
                >
                  <Link to={slide.buttonLink} className="flex items-center gap-2">
                    {buttonText}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      {settings.slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {settings.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
