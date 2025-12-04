import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter, Truck, RefreshCw, CreditCard, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#3d3d35] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold tracking-wide mb-2">BE THE FIRST TO KNOW</h3>
              <p className="text-gray-400 text-sm max-w-md">
                Subscribe to our newsletter for exclusive content, and special offers delivered straight to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-72 px-4 py-3 bg-transparent border border-gray-600 rounded-none text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                  required
                />
                <Send className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-[#3d3d35] font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Free Delivery</h4>
                <p className="text-gray-400 text-xs mt-0.5">Free Delivery On Orders Over 300 AED</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Hassle-Free Returns</h4>
                <p className="text-gray-400 text-xs mt-0.5">Within 7 days of delivery.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Easy Installments</h4>
                <p className="text-gray-400 text-xs mt-0.5">Pay Later with tabby.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Visit Us In-Store</h4>
                <p className="text-gray-400 text-xs mt-0.5">In Abu Dhabi and Dubai.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-serif font-bold tracking-tight">GREEN</h2>
              <h2 className="text-3xl font-serif font-bold tracking-tight">GRASS</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              We craft timeless pieces that blend elegance and functionality, elevating every space into a masterpiece. Our commitment to quality and design ensures that your home reflects sophistication and comfort in every detail.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://www.instagram.com/greengrass_decor" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/greengrassstore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/971547751901" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Plants & Flowers */}
          <div>
            <h4 className="font-bold text-sm mb-4">Plants & Flowers</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/shop?category=plants" className="hover:text-white transition-colors">Plants</Link></li>
              <li><Link to="/shop?category=flowers" className="hover:text-white transition-colors">Flowers</Link></li>
              <li><Link to="/shop?category=greenery" className="hover:text-white transition-colors">Greenery</Link></li>
              <li><Link to="/shop?category=hanging" className="hover:text-white transition-colors">Hanging</Link></li>
            </ul>
          </div>

          {/* Pots */}
          <div>
            <h4 className="font-bold text-sm mb-4">Pots</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/shop?category=fiber-pot" className="hover:text-white transition-colors">Fiber Pot</Link></li>
              <li><Link to="/shop?category=plastic-pot" className="hover:text-white transition-colors">Plastic Pot</Link></li>
              <li><Link to="/shop?category=ceramic-pot" className="hover:text-white transition-colors">Ceramic Pot</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-sm mb-4">Help</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-sm mb-4">About</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/vip" className="hover:text-white transition-colors">VIP Program</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © 2025 Green Grass Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <span>www.greengrassstore.com</span>
            </div>
          </div>
          {/* Developer Credit */}
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500">
              Developed by{" "}
              <a
                href="https://www.websearchbd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
              >
                Web Search BD
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};