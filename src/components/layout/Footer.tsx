import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Globe } from "lucide-react";
import logo from "@/assets/logo.jpg";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo & Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-[#2d5a3d]">
                <span className="text-xl font-bold tracking-tight">GREEN</span>
                <span className="block text-xl font-bold tracking-tight">GRASS</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#2d5a3d] hover:text-[#2d5a3d] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#2d5a3d] hover:text-[#2d5a3d] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#2d5a3d] hover:text-[#2d5a3d] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium text-gray-900 mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/plants" className="hover:text-[#2d5a3d] transition-colors">{t("nav.plants")}</a></li>
              <li><a href="/pots" className="hover:text-[#2d5a3d] transition-colors">{t("nav.pots")}</a></li>
              <li><a href="/planters" className="hover:text-[#2d5a3d] transition-colors">{t("nav.planters")}</a></li>
              <li><a href="/vases" className="hover:text-[#2d5a3d] transition-colors">{t("nav.vases")}</a></li>
              <li><a href="/homecare" className="hover:text-[#2d5a3d] transition-colors">{t("nav.homecare")}</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium text-gray-900 mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/about" className="hover:text-[#2d5a3d] transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#2d5a3d] transition-colors">Contact</a></li>
              <li><a href="/faq" className="hover:text-[#2d5a3d] transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-[#2d5a3d] transition-colors">Shipping</a></li>
              <li><a href="/returns" className="hover:text-[#2d5a3d] transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium text-gray-900 mb-4">My Account</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/account" className="hover:text-[#2d5a3d] transition-colors">My Account</a></li>
              <li><a href="/orders" className="hover:text-[#2d5a3d] transition-colors">Order History</a></li>
              <li><a href="/wishlist" className="hover:text-[#2d5a3d] transition-colors">Wishlist</a></li>
              <li><a href="/newsletter" className="hover:text-[#2d5a3d] transition-colors">Newsletter</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-medium text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 text-[#2d5a3d]" />
                <span>www.greengrassstore.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#2d5a3d]" />
                <span>Dubai, UAE</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-[#2d5a3d]" />
                <span>info@greengrassstore.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-[#2d5a3d]" />
                <span>+971 4 XXX XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2024 Green Grass Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-[#2d5a3d] transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#2d5a3d] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
