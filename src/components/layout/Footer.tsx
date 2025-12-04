import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, Send, Leaf } from "lucide-react";
import logo from "@/assets/logo.jpg";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1a5d1a] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/70 text-sm">Get exclusive offers, plant care tips, and new arrivals updates</p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-sm placeholder:text-white/50 focus:outline-none focus:border-white/40"
              />
              <button className="px-6 py-3 bg-white text-[#1a5d1a] font-medium rounded-r-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo & About */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <img src={logo} alt="Green Grass" className="h-16 w-auto mb-4 bg-white rounded-lg p-2" />
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Your premium destination for plants, pots, and home garden essentials in Dubai.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a5d1a] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a5d1a] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a5d1a] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#1a5d1a] transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-5 flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="/plants" className="hover:text-white hover:pl-1 transition-all">{t("nav.plants")}</a></li>
              <li><a href="/pots" className="hover:text-white hover:pl-1 transition-all">{t("nav.pots")}</a></li>
              <li><a href="/planters" className="hover:text-white hover:pl-1 transition-all">{t("nav.planters")}</a></li>
              <li><a href="/vases" className="hover:text-white hover:pl-1 transition-all">{t("nav.vases")}</a></li>
              <li><a href="/homecare" className="hover:text-white hover:pl-1 transition-all">{t("nav.homecare")}</a></li>
              <li><a href="/sale" className="hover:text-white hover:pl-1 transition-all text-yellow-300">{t("nav.sale")}</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-5">Information</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="/about" className="hover:text-white hover:pl-1 transition-all">About Us</a></li>
              <li><a href="/blog" className="hover:text-white hover:pl-1 transition-all">Blog</a></li>
              <li><a href="/faq" className="hover:text-white hover:pl-1 transition-all">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-white hover:pl-1 transition-all">Shipping Policy</a></li>
              <li><a href="/returns" className="hover:text-white hover:pl-1 transition-all">Returns & Refunds</a></li>
              <li><a href="/track-order" className="hover:text-white hover:pl-1 transition-all">Track Order</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-5">Customer Service</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="/contact" className="hover:text-white hover:pl-1 transition-all">Contact Us</a></li>
              <li><a href="/account" className="hover:text-white hover:pl-1 transition-all">My Account</a></li>
              <li><a href="/wishlist" className="hover:text-white hover:pl-1 transition-all">Wishlist</a></li>
              <li><a href="/plant-care" className="hover:text-white hover:pl-1 transition-all">Plant Care Guide</a></li>
              <li><a href="/size-guide" className="hover:text-white hover:pl-1 transition-all">Size Guide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-semibold mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Al Quoz Industrial Area 3, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+97144XXXXXX" className="hover:text-white transition-colors">+971 4 XXX XXXX</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@greengrassstore.com" className="hover:text-white transition-colors">info@greengrassstore.com</a>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50 mb-2">Working Hours</p>
              <p className="text-sm text-white/70">Mon - Sat: 9:00 AM - 9:00 PM</p>
              <p className="text-sm text-white/70">Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-xs text-white/50">We Accept:</span>
              <div className="flex items-center gap-2">
                {["Visa", "Mastercard", "Apple Pay", "Tabby", "Tamara"].map((method) => (
                  <div key={method} className="px-3 py-1.5 bg-white/10 rounded text-xs font-medium">
                    {method}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span>100% Secure Checkout</span>
              <span>•</span>
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#145214]">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            © 2024 Green Grass Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/60">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
