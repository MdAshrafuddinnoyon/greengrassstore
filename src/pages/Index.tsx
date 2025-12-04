import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { PromoSection } from "@/components/home/PromoSection";
import { GiftSection } from "@/components/home/GiftSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { plantsProducts, potsProducts, vasesProducts } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        <CategorySection />
        
        <ProductGrid
          title={t("section.plants")}
          subtitle="Best Sellers"
          products={plantsProducts}
          viewAllLink="/plants"
        />

        <FeaturedSection
          layout="left"
          image="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1200&q=80"
          title="Bring Nature Indoors"
          subtitle="Indoor Plants"
          description="Transform your living space with our curated collection of indoor plants. Perfect for apartments, offices, and homes in Dubai's climate."
          ctaText="Shop Plants"
          ctaLink="/plants"
        />

        <ProductGrid
          title={t("section.pots")}
          subtitle="New Arrivals"
          products={potsProducts}
          viewAllLink="/pots"
        />

        <PromoSection />

        <ProductGrid
          title={t("section.vases")}
          subtitle="Trending"
          products={vasesProducts}
          viewAllLink="/vases"
        />

        <FeaturedSection
          layout="right"
          image="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=1200&q=80"
          title="Elegant Plant Displays"
          subtitle="Planters Collection"
          description="Discover our range of premium planters designed to complement any interior style, from modern minimalist to classic elegance."
          ctaText="Shop Planters"
          ctaLink="/planters"
          bgColor="bg-muted"
        />

        <GiftSection />

        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
