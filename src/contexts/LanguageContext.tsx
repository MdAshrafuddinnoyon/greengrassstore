import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.plants": "Plants",
    "nav.pots": "Pots",
    "nav.planters": "Planters",
    "nav.vases": "Vases",
    "nav.homecare": "Homecare",
    "nav.sale": "Sale",
    
    // Hero
    "hero.title": "Plants, Planters & Pots",
    "hero.subtitle": "Your one-stop destination for indoor & outdoor greenery",
    "hero.cta": "Shop Now",
    
    // Sections
    "section.plants": "Plants",
    "section.plants.desc": "Bring nature indoors",
    "section.pots": "Pots",
    "section.pots.desc": "Beautiful containers for your plants",
    "section.planters": "Planters",
    "section.planters.desc": "Elegant plant displays",
    "section.vases": "Vases",
    "section.vases.desc": "Decorative flower holders",
    "section.homecare": "Homecare",
    "section.homecare.desc": "Plant care essentials",
    
    // Products
    "product.addToCart": "Add to Cart",
    "product.quickView": "Quick View",
    "product.sale": "Sale",
    "product.new": "New",
    "product.soldOut": "Sold Out",
    
    // CTA
    "cta.shopAll": "Shop All",
    "cta.viewMore": "View More",
    "cta.learnMore": "Learn More",
    
    // Promo
    "promo.title": "November Sale",
    "promo.subtitle": "Up to 30% off on selected items",
    "promo.cta": "Shop Sale",
    
    // Gift
    "gift.title": "Gift Garden",
    "gift.subtitle": "Perfect presents for plant lovers",
    "gift.desc": "Curated gift sets and vouchers available",
    
    // Footer
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.shipping": "Shipping & Returns",
    "footer.faq": "FAQ",
    "footer.newsletter": "Subscribe to our newsletter",
    "footer.email": "Enter your email",
    "footer.subscribe": "Subscribe",
    "footer.rights": "All rights reserved",
    "footer.location": "Dubai, UAE",
    
    // Common
    "common.currency": "AED",
    "common.search": "Search",
    "common.cart": "Cart",
    "common.account": "Account",
  },
  ar: {
    // Navigation
    "nav.plants": "نباتات",
    "nav.pots": "أواني",
    "nav.planters": "مزهريات",
    "nav.vases": "مزهريات زجاجية",
    "nav.homecare": "العناية المنزلية",
    "nav.sale": "تخفيضات",
    
    // Hero
    "hero.title": "نباتات ومزهريات وأواني",
    "hero.subtitle": "وجهتك الشاملة للنباتات الداخلية والخارجية",
    "hero.cta": "تسوق الآن",
    
    // Sections
    "section.plants": "نباتات",
    "section.plants.desc": "أحضر الطبيعة للداخل",
    "section.pots": "أواني",
    "section.pots.desc": "حاويات جميلة لنباتاتك",
    "section.planters": "مزهريات",
    "section.planters.desc": "عروض نباتية أنيقة",
    "section.vases": "مزهريات زجاجية",
    "section.vases.desc": "حاملات الزهور الزخرفية",
    "section.homecare": "العناية المنزلية",
    "section.homecare.desc": "أساسيات العناية بالنباتات",
    
    // Products
    "product.addToCart": "أضف إلى السلة",
    "product.quickView": "عرض سريع",
    "product.sale": "تخفيض",
    "product.new": "جديد",
    "product.soldOut": "نفذ",
    
    // CTA
    "cta.shopAll": "تسوق الكل",
    "cta.viewMore": "عرض المزيد",
    "cta.learnMore": "اعرف المزيد",
    
    // Promo
    "promo.title": "تخفيضات نوفمبر",
    "promo.subtitle": "خصم يصل إلى 30٪ على منتجات مختارة",
    "promo.cta": "تسوق التخفيضات",
    
    // Gift
    "gift.title": "حديقة الهدايا",
    "gift.subtitle": "هدايا مثالية لمحبي النباتات",
    "gift.desc": "مجموعات هدايا وقسائم متاحة",
    
    // Footer
    "footer.about": "من نحن",
    "footer.contact": "اتصل بنا",
    "footer.shipping": "الشحن والإرجاع",
    "footer.faq": "الأسئلة الشائعة",
    "footer.newsletter": "اشترك في نشرتنا الإخبارية",
    "footer.email": "أدخل بريدك الإلكتروني",
    "footer.subscribe": "اشترك",
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.location": "دبي، الإمارات",
    
    // Common
    "common.currency": "د.إ",
    "common.search": "بحث",
    "common.cart": "السلة",
    "common.account": "الحساب",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
