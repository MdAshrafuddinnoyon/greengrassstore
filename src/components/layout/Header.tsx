import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, User, Heart, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { key: "nav.plants", href: "/plants" },
  { key: "nav.pots", href: "/pots" },
  { key: "nav.planters", href: "/planters" },
  { key: "nav.vases", href: "/vases" },
  { key: "nav.homecare", href: "/homecare" },
  { key: "nav.sale", href: "/sale" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(2);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1a5d1a] text-white text-[11px] py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="hidden sm:block">Free delivery on orders over AED 200</span>
          <span className="sm:hidden text-center flex-1">Free delivery over AED 200</span>
          <div className="flex items-center gap-4">
            <a href="/track-order" className="hover:underline hidden md:block">Track Order</a>
            <a href="/contact" className="hover:underline hidden md:block">Contact</a>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Globe className="w-3 h-3" />
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-white border-b border-gray-100",
          isScrolled && "shadow-md"
        )}
      >
        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center">
              <img src={logo} alt="Green Grass" className="h-14 md:h-16 w-auto" />
            </a>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search plants, pots, vases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1a5d1a] text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#145214] transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#1a5d1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block border-t border-gray-100 bg-white">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-8 h-12">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-[12px] uppercase tracking-[0.15em] font-medium text-gray-700 hover:text-[#1a5d1a] transition-colors flex items-center gap-1"
                  >
                    {t(link.key)}
                    <ChevronDown className="w-3 h-3" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/blog"
                  className="text-[12px] uppercase tracking-[0.15em] font-medium text-gray-700 hover:text-[#1a5d1a] transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white"
            >
              <div className="container mx-auto px-4 py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-green-600"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: language === "ar" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: language === "ar" ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed top-0 bottom-0 w-[300px] bg-white z-50 lg:hidden shadow-2xl overflow-y-auto",
                language === "ar" ? "right-0" : "left-0"
              )}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-8">
                  <img src={logo} alt="Green Grass" className="h-12 w-auto" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="block py-3.5 px-4 text-sm uppercase tracking-widest font-medium hover:bg-[#1a5d1a]/10 hover:text-[#1a5d1a] rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(link.key)}
                    </motion.a>
                  ))}
                  <motion.a
                    href="/blog"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="block py-3.5 px-4 text-sm uppercase tracking-widest font-medium hover:bg-[#1a5d1a]/10 hover:text-[#1a5d1a] rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blog
                  </motion.a>
                </nav>
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-sm font-medium hover:text-[#1a5d1a] transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    {language === "en" ? "العربية" : "English"}
                  </button>
                  <a href="/account" className="flex items-center gap-2 text-sm font-medium hover:text-[#1a5d1a] transition-colors">
                    <User className="w-4 h-4" />
                    My Account
                  </a>
                  <a href="/wishlist" className="flex items-center gap-2 text-sm font-medium hover:text-[#1a5d1a] transition-colors">
                    <Heart className="w-4 h-4" />
                    Wishlist
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
