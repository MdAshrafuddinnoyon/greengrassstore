import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import ikebana from "@/assets/ikebana.jpg";
import flowerPot from "@/assets/flower-pot.jpg";
import ficusPlant from "@/assets/ficus-plant.jpg";

const giftItems = [
  {
    id: 1,
    name: "Garden Gift Set",
    price: 199,
    image: ikebana,
    href: "/shop?category=gifts",
  },
  {
    id: 2,
    name: "Plant Lover Bundle",
    price: 149,
    image: flowerPot,
    href: "/shop?category=gifts",
  },
  {
    id: 3,
    name: "Indoor Oasis Kit",
    price: 249,
    image: ficusPlant,
    href: "/shop?category=gifts",
  },
];

export const GiftSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#f8f8f5]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-[#2d5a3d]" />
            <p className="text-[10px] uppercase tracking-widest text-[#2d5a3d] font-semibold">
              Perfect Presents
            </p>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-normal text-gray-900 mb-3">
            Gift Garden
          </h2>
          <p className="text-gray-600 max-w-md mx-auto text-sm">
            Thoughtfully curated gift sets for plant lovers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {giftItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={item.href}
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-[#f5f5f5] rounded-xl mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-[#2d5a3d] transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">AED {item.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/shop?category=gifts"
            className="inline-flex items-center gap-2 bg-[#2d5a3d] text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[#234a31] transition-colors"
          >
            <Gift className="w-4 h-4" />
            View All Gifts
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};
