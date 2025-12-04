import { Product } from "@/components/products/ProductCard";

export const plantsProducts: Product[] = [
  {
    id: "plant-1",
    name: "Monstera Deliciosa",
    nameAr: "مونستيرا ديليسيوسا",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=600&q=80",
    category: "Indoor Plants",
    badge: "sale",
  },
  {
    id: "plant-2",
    name: "Fiddle Leaf Fig",
    nameAr: "تين فيدل ليف",
    price: 399,
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80",
    category: "Indoor Plants",
    badge: "new",
  },
  {
    id: "plant-3",
    name: "Snake Plant",
    nameAr: "نبات الثعبان",
    price: 129,
    image: "https://images.unsplash.com/photo-1593482892540-9e6d7b52e25e?w=600&q=80",
    category: "Indoor Plants",
  },
  {
    id: "plant-4",
    name: "Peace Lily",
    nameAr: "زنبق السلام",
    price: 179,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&q=80",
    category: "Indoor Plants",
  },
];

export const potsProducts: Product[] = [
  {
    id: "pot-1",
    name: "Terracotta Classic Pot",
    nameAr: "إناء تيراكوتا كلاسيكي",
    price: 89,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    category: "Pots",
  },
  {
    id: "pot-2",
    name: "Ceramic White Planter",
    nameAr: "مزهرية سيراميك بيضاء",
    price: 149,
    originalPrice: 179,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80",
    category: "Pots",
    badge: "sale",
  },
  {
    id: "pot-3",
    name: "Modern Black Pot",
    nameAr: "إناء أسود حديث",
    price: 119,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
    category: "Pots",
    badge: "new",
  },
  {
    id: "pot-4",
    name: "Geometric Concrete Pot",
    nameAr: "إناء خرساني هندسي",
    price: 99,
    image: "https://images.unsplash.com/photo-1602081116037-a4f2f4ec76f9?w=600&q=80",
    category: "Pots",
  },
];

export const vasesProducts: Product[] = [
  {
    id: "vase-1",
    name: "Glass Bubble Vase",
    nameAr: "مزهرية زجاجية فقاعية",
    price: 199,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&q=80",
    category: "Vases",
  },
  {
    id: "vase-2",
    name: "Ceramic Minimalist Vase",
    nameAr: "مزهرية سيراميك بسيطة",
    price: 159,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80",
    category: "Vases",
    badge: "new",
  },
  {
    id: "vase-3",
    name: "Blue Textured Vase",
    nameAr: "مزهرية زرقاء منقوشة",
    price: 229,
    originalPrice: 279,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
    category: "Vases",
    badge: "sale",
  },
  {
    id: "vase-4",
    name: "Tall Cylinder Vase",
    nameAr: "مزهرية أسطوانية طويلة",
    price: 179,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
    category: "Vases",
  },
];

export const homecareProducts: Product[] = [
  {
    id: "care-1",
    name: "Plant Mister",
    nameAr: "بخاخ النباتات",
    price: 49,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    category: "Homecare",
  },
  {
    id: "care-2",
    name: "Organic Plant Food",
    nameAr: "غذاء نباتي عضوي",
    price: 39,
    image: "https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=600&q=80",
    category: "Homecare",
    badge: "new",
  },
  {
    id: "care-3",
    name: "Garden Tool Set",
    nameAr: "مجموعة أدوات الحديقة",
    price: 129,
    originalPrice: 149,
    image: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=600&q=80",
    category: "Homecare",
    badge: "sale",
  },
  {
    id: "care-4",
    name: "Watering Can",
    nameAr: "إبريق السقي",
    price: 79,
    image: "https://images.unsplash.com/photo-1559070169-a3077159ee16?w=600&q=80",
    category: "Homecare",
  },
];

export const allProducts: Product[] = [
  ...plantsProducts,
  ...potsProducts,
  ...vasesProducts,
  ...homecareProducts,
];
