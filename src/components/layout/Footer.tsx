import { Facebook, Instagram, Twitter, Leaf, MapPin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl mb-3">
              {t("footer.newsletter")}
            </h3>
            <p className="text-background/60 text-sm mb-6">
              Get updates on new arrivals, exclusive offers and plant care tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={t("footer.email")}
                className="flex-1 px-4 py-3 bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:border-background/40 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors"
              >
                {t("footer.subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-base font-semibold">GREEN</span>
                <span className="font-display text-base font-semibold">GRASS</span>
              </div>
            </div>
            <p className="text-background/60 text-sm mb-4">
              Your one-stop destination for indoor & outdoor greenery in Dubai.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="/plants" className="hover:text-background transition-colors">{t("nav.plants")}</a></li>
              <li><a href="/pots" className="hover:text-background transition-colors">{t("nav.pots")}</a></li>
              <li><a href="/planters" className="hover:text-background transition-colors">{t("nav.planters")}</a></li>
              <li><a href="/vases" className="hover:text-background transition-colors">{t("nav.vases")}</a></li>
              <li><a href="/homecare" className="hover:text-background transition-colors">{t("nav.homecare")}</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-medium mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="/about" className="hover:text-background transition-colors">{t("footer.about")}</a></li>
              <li><a href="/contact" className="hover:text-background transition-colors">{t("footer.contact")}</a></li>
              <li><a href="/shipping" className="hover:text-background transition-colors">{t("footer.shipping")}</a></li>
              <li><a href="/faq" className="hover:text-background transition-colors">{t("footer.faq")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-medium mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Al Quoz Industrial Area 3, Dubai, UAE</span>
              </li>
              <li>
                <a href="tel:+97145551234" className="flex items-center gap-2 hover:text-background transition-colors">
                  <Phone className="w-4 h-4" />
                  +971 4 555 1234
                </a>
              </li>
              <li>
                <a href="mailto:hello@greengrass.ae" className="flex items-center gap-2 hover:text-background transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@greengrass.ae
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/50">
            <p>© 2025 Green Grass. {t("footer.rights")}.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-background transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
