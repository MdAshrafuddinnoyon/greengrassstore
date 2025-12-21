import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, User, ChevronDown, ChevronLeft, ChevronRight, Leaf, TreeDeciduous, Flower2, Package, Grid3X3, Shrub, Tag, Gift, Sparkles, Fence, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import logo from "@/assets/logo-192.png";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  leaf: Leaf,
  flower: Flower2,
  package: Package,
  shrub: Shrub,
  sparkles: Sparkles,
  gift: Gift,
  tag: Tag,
  'tree-deciduous': TreeDeciduous,
  grid: Grid3X3,
  fence: Fence,
  boxes: Boxes,
};

const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Leaf;
};

export const Header = () => {
  return (
    <>
      {/* Announcement Bar */}
      {(!!announcementBar?.enabled && Array.isArray(activeAnnouncements) && activeAnnouncements.length > 0) ? (
        <div 
          className="py-2.5"
          style={{ 
            backgroundColor: announcementBar.backgroundColor,
            color: announcementBar.textColor 
          }}
        >
          <div className="container mx-auto px-4 flex items-center justify-center">
            {/* Navigation buttons - hidden on mobile */}
            <button 
              onClick={prevAnnouncement} 
              className="hidden md:block p-1 hover:bg-white/10 rounded transition-colors" 
              aria-label="Previous announcement"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-sm font-medium text-center flex-1 md:flex-none">
              {isArabic 
                ? activeAnnouncements[currentAnnouncement]?.textAr 
                : activeAnnouncements[currentAnnouncement]?.text
              }
            </p>
            {/* Navigation buttons - hidden on mobile */}
            <button 
              onClick={nextAnnouncement} 
              className="hidden md:block p-1 hover:bg-white/10 rounded transition-colors" 
              aria-label="Next announcement"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Main Header */}
      <header 
        className={cn("sticky top-0 z-50 transition-all duration-300", isScrolled && "shadow-md")}
        style={{ backgroundColor: themeColors?.headerBackground || '#ffffff' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded transition-colors" 
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar - Left */}
            <div className="hidden md:flex items-center flex-1 max-w-sm">
              <SearchSuggestions />
            </div>

            {/* Logo - Center */}
            <Link to="/" className="flex flex-col items-center justify-center flex-shrink-0 mx-4 lg:mx-8">
              {(branding.logoUrl && branding.logoUrl.trim() !== "") ? (
                <img 
                  key={branding.logoUrl}
                  src={branding.logoUrl} 
                  alt={branding.siteName || "Green Grass"} 
                  className="h-10 md:h-12 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              ) : null}
              <span className="text-[10px] text-gray-500 hidden md:block">www.greengrassstore.com</span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end max-w-sm">
              <button 
                onClick={toggleLanguage} 
                className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded hover:bg-gray-100"
              >
                <span className="font-medium">{language === "en" ? "العربية" : "English"}</span>
              </button>
              
              <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Account">
                <User className="w-5 h-5 text-gray-600" />
              </Link>
              
              <div className="flex items-center gap-1">
                <CartDrawer />
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  AED {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar with Mega Menu */}
        <nav className="hidden lg:block bg-[#3a3a3a]" ref={megaMenuRef}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              {categories.map(category => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <div 
                    key={category.id} 
                    className="relative" 
                    onMouseEnter={() => category.subcategories.length > 0 ? handleMouseEnter(category.id) : setActiveMegaMenu(null)} 
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link 
                      to={category.href} 
                      className={cn(
                        "flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors", 
                        category.isSale && "text-red-400 hover:text-red-300", 
                        activeMegaMenu === category.id && "bg-white/10"
                      )}
                    >
                      <IconComponent className="w-4 h-4" />
                      {isArabic ? category.nameAr : category.name}
                      {category.subcategories.length > 0 && (
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMegaMenu === category.id && "rotate-180")} />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {activeMegaMenu && activeCategory && activeCategory.subcategories.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
              >
                {/* ...existing mega menu dropdown code... */}
              </motion.div>
            )}
          </AnimatePresence>

        {/* Navigation Bar with Mega Menu */}
        <nav className="hidden lg:block bg-[#3a3a3a]" ref={megaMenuRef}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              {categories.map(category => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <div 
                    key={category.id} 
                    className="relative" 
                    onMouseEnter={() => category.subcategories.length > 0 ? handleMouseEnter(category.id) : setActiveMegaMenu(null)} 
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link 
                      to={category.href} 
                      className={cn(
                        "flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-colors", 
                        category.isSale && "text-red-400 hover:text-red-300", 
                        activeMegaMenu === category.id && "bg-white/10"
                      )}
                    >
                      <IconComponent className="w-4 h-4" />
                      {isArabic ? category.nameAr : category.name}
                      {category.subcategories.length > 0 && (
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMegaMenu === category.id && "rotate-180")} />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {activeMegaMenu && activeCategory && activeCategory.subcategories.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                transition={{ duration: 0.2 }} 
                className="absolute left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-[100]" 
                onMouseEnter={() => handleMouseEnter(activeMegaMenu)} 
                onMouseLeave={handleMouseLeave}
              >
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    {/* Subcategories */}
                    <div className="col-span-4">
                      <Link to={activeCategory.href} className="text-lg font-semibold text-[#2d5a3d] mb-4 block hover:underline">
                        {isArabic ? `جميع ${activeCategory.nameAr}` : `All ${activeCategory.name}`}
                      </Link>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {activeCategory.subcategories.sort((a, b) => a.order - b.order).map(sub => {
                          const SubIcon = getIconComponent(sub.icon);
                          return (
                            <Link 
                              key={sub.id} 
                              to={sub.href} 
                              className="group flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-[#2d5a3d] transition-colors"
                            >
                              <SubIcon className="w-4 h-4 text-gray-400 group-hover:text-[#2d5a3d] transition-colors" />
                              <span>{isArabic ? sub.nameAr : sub.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Featured Section */}
                    {activeCategory.featuredTitle && (
                      <div className="col-span-4">
                        <div className="bg-gradient-to-br from-[#2d5a3d]/5 to-[#2d5a3d]/10 rounded-2xl p-6">
                          <p className="text-xs uppercase tracking-widest text-[#2d5a3d]/70 mb-2">
                            {isArabic ? "مميز" : "Featured"}
                          </p>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {isArabic ? activeCategory.featuredTitleAr : activeCategory.featuredTitle}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {isArabic ? activeCategory.featuredSubtitleAr : activeCategory.featuredSubtitle}
                          </p>
                          <Link 
                            to={activeCategory.featuredHref} 
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#2d5a3d] hover:gap-3 transition-all"
                          >
                            {isArabic ? "تسوق الآن" : "Shop Now"}
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Category Image */}
                    {activeCategory.image && (
                      <div className="col-span-4">
                        <Link to={activeCategory.href} className="block group">
                          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                            <img 
                              src={activeCategory.image} 
                              alt={isArabic ? activeCategory.nameAr : activeCategory.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                          </div>
                          <p className="mt-3 text-sm font-medium text-gray-900 group-hover:text-[#2d5a3d] transition-colors">
                            {isArabic ? `استكشف مجموعة ${activeCategory.nameAr}` : `Explore ${activeCategory.name} Collection`}
                          </p>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Quick Links */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-8">
                    <Link to="/shop?category=sale" className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                      <Tag className="w-4 h-4" />
                      {isArabic ? "عروض التخفيضات" : "Sale Offers"}
                    </Link>
                    <Link to="/shop?category=new-arrivals" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#2d5a3d] transition-colors">
                      <Sparkles className="w-4 h-4" />
                      {isArabic ? "وصل حديثاً" : "New Arrivals"}
                    </Link>
                    <Link to="/shop?category=gifts" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#2d5a3d] transition-colors">
                      <Gift className="w-4 h-4" />
                      {isArabic ? "أفكار هدايا" : "Gift Ideas"}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
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
              className={cn("fixed top-0 bottom-0 w-[320px] bg-white z-50 lg:hidden shadow-2xl overflow-y-auto", language === "ar" ? "right-0" : "left-0")}
            >
              <div className="p-5">
                {/* ...existing code... */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </header>
                        <a 
                          href={footer.socialLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-[#2d5a3d] hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                      )}
                      {footer.socialLinks?.facebook && (
                        <a 
                          href={footer.socialLinks.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-[#2d5a3d] hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        </a>
                      )}
                      {footer.socialLinks?.whatsapp && (
                        <a 
                          href={`https://wa.me/${footer.socialLinks.whatsapp.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-[#25D366] hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </a>
                      )}
                      {footer.socialLinks?.twitter && (
                        <a 
                          href={footer.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-[#1DA1F2] hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                      )}
                      {footer.socialLinks?.youtube && (
                        <a 
                          href={footer.socialLinks.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-[#FF0000] hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
