import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductSection } from "@/components/products/ProductSection";
import { ShopifyProductGrid } from "@/components/products/ShopifyProductGrid";
import { CategoryBanner } from "@/components/home/CategoryBanner";
import { PromoSection } from "@/components/home/PromoSection";
import { GiftSection } from "@/components/home/GiftSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { BlogSection } from "@/components/home/BlogSection";
import {
  plantsProducts,
  potsProducts,
  plantersProducts,
  vasesProducts,
  homecareProducts,
} from "@/data/products";

// Import category banner images
import hangingPlants from "@/assets/hanging-plants.jpg";
import womanPlant from "@/assets/woman-plant.jpg";
import bluePot from "@/assets/blue-pot.jpg";
import ikebana from "@/assets/ikebana.jpg";
import plantPot from "@/assets/plant-pot.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Shopify Products - Real Products from Store */}
        <ShopifyProductGrid title="Shop Our Products" limit={8} />

        {/* PLANTS Section */}
        <ProductSection
          title="PLANTS"
          subtitle="Indoor & Outdoor"
          products={plantsProducts}
          viewAllLink="/shop?category=plants"
        />

        {/* POTS Banner */}
        <CategoryBanner
          title="POTS"
          subtitle="Collection"
          description="Beautiful containers in terracotta, ceramic, and modern designs"
          image={plantPot}
          href="/shop?category=pots"
          layout="left"
          bgColor="bg-[#f8f8f5]"
        />

        {/* POTS Products */}
        <ProductSection
          title="POTS"
          subtitle="Shop by Style"
          products={potsProducts}
          viewAllLink="/shop?category=pots"
        />

        {/* Greenery Banner */}
        <CategoryBanner
          title="GREENERY"
          subtitle="Green Walls & Bunches"
          description="Transform your space with lush greenery"
          image={hangingPlants}
          href="/shop?category=greenery"
          layout="right"
          bgColor="bg-[#f0f4f0]"
        />

        {/* Flowers Section */}
        <ProductSection
          title="FLOWERS"
          subtitle="Fresh & Artificial"
          products={homecareProducts}
          viewAllLink="/shop?category=flowers"
        />

        {/* VASES Banner */}
        <CategoryBanner
          title="VASES"
          subtitle="Decorative"
          description="Elegant vases for every style"
          image={bluePot}
          href="/shop?category=vases"
          layout="center"
        />

        {/* VASES Products */}
        <ProductSection
          title="VASES"
          subtitle="Decorative"
          products={vasesProducts}
          viewAllLink="/shop?category=vases"
        />

        {/* Hanging Plants Banner */}
        <CategoryBanner
          title="Hanging Plants"
          subtitle="Vertical Gardens"
          description="Beautiful hanging solutions for your space"
          image={womanPlant}
          href="/shop?category=hanging"
          layout="center"
        />

        {/* Sale Banner */}
        <PromoSection />

        {/* Gift Garden Section */}
        <GiftSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Instagram Feed */}
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
