import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Truck, RefreshCw, CreditCard, ShieldCheck, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const faqCategories = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: isArabic ? "الشحن والتوصيل" : "Shipping & Delivery",
      faqs: [
        {
          question: isArabic ? "ما هي مناطق التوصيل؟" : "What areas do you deliver to?",
          answer: isArabic 
            ? "نقوم بالتوصيل إلى جميع أنحاء الإمارات العربية المتحدة بما في ذلك دبي وأبوظبي والشارقة وعجمان ورأس الخيمة والفجيرة وأم القيوين."
            : "We deliver across all UAE including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain."
        },
        {
          question: isArabic ? "كم تستغرق عملية التوصيل؟" : "How long does delivery take?",
          answer: isArabic
            ? "عادة ما يستغرق التوصيل 2-5 أيام عمل داخل دبي و 3-7 أيام عمل للإمارات الأخرى."
            : "Delivery typically takes 2-5 business days within Dubai and 3-7 business days for other Emirates."
        },
        {
          question: isArabic ? "هل يوجد توصيل مجاني؟" : "Is there free shipping?",
          answer: isArabic
            ? "نعم! نقدم توصيل مجاني للطلبات التي تزيد قيمتها عن 200 درهم إماراتي."
            : "Yes! We offer free shipping on orders above AED 200."
        },
      ]
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: isArabic ? "الإرجاع والاستبدال" : "Returns & Exchange",
      faqs: [
        {
          question: isArabic ? "ما هي سياسة الإرجاع؟" : "What is your return policy?",
          answer: isArabic
            ? "يمكنك إرجاع المنتجات خلال 14 يومًا من تاريخ الاستلام. يجب أن تكون المنتجات في حالتها الأصلية وغير مستخدمة."
            : "You can return products within 14 days of receiving your order. Products must be in their original condition and unused."
        },
        {
          question: isArabic ? "كيف يمكنني طلب الإرجاع؟" : "How do I request a return?",
          answer: isArabic
            ? "يمكنك التواصل معنا عبر واتساب على الرقم +971547751901 أو إرسال بريد إلكتروني إلينا لطلب الإرجاع."
            : "You can contact us via WhatsApp at +971547751901 or send us an email to request a return."
        },
        {
          question: isArabic ? "هل يمكنني استبدال منتج؟" : "Can I exchange a product?",
          answer: isArabic
            ? "نعم، نقدم خدمة الاستبدال. يرجى التواصل معنا خلال 14 يومًا من استلام الطلب."
            : "Yes, we offer exchanges. Please contact us within 14 days of receiving your order."
        },
      ]
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: isArabic ? "الدفع" : "Payment",
      faqs: [
        {
          question: isArabic ? "ما هي طرق الدفع المتاحة؟" : "What payment methods do you accept?",
          answer: isArabic
            ? "نقبل بطاقات الائتمان/الخصم (Visa, Mastercard)، الدفع عند الاستلام، Apple Pay، وTabby للتقسيط."
            : "We accept Credit/Debit cards (Visa, Mastercard), Cash on Delivery, Apple Pay, and Tabby for installments."
        },
        {
          question: isArabic ? "هل يمكنني الدفع بالتقسيط؟" : "Can I pay in installments?",
          answer: isArabic
            ? "نعم! نقدم خدمة التقسيط عبر Tabby. يمكنك تقسيم دفعتك على 4 أقساط بدون فوائد."
            : "Yes! We offer installment payments through Tabby. You can split your payment into 4 interest-free installments."
        },
        {
          question: isArabic ? "هل الدفع آمن؟" : "Is payment secure?",
          answer: isArabic
            ? "نعم، جميع المعاملات مشفرة وآمنة 100%. نستخدم بوابات دفع معتمدة ومرخصة."
            : "Yes, all transactions are 100% encrypted and secure. We use certified and licensed payment gateways."
        },
      ]
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: isArabic ? "جودة المنتجات" : "Product Quality",
      faqs: [
        {
          question: isArabic ? "هل النباتات حقيقية أم اصطناعية؟" : "Are the plants real or artificial?",
          answer: isArabic
            ? "نقدم نباتات اصطناعية عالية الجودة تبدو وكأنها حقيقية. جميع منتجاتنا مصنوعة من مواد متينة ومقاومة للأشعة فوق البنفسجية."
            : "We offer high-quality artificial plants that look like real ones. All our products are made from durable and UV-resistant materials."
        },
        {
          question: isArabic ? "كيف أعتني بالنباتات الاصطناعية؟" : "How do I care for artificial plants?",
          answer: isArabic
            ? "النباتات الاصطناعية تحتاج فقط إلى تنظيف دوري بقطعة قماش ناعمة لإزالة الغبار. لا تحتاج إلى ماء أو ضوء شمس."
            : "Artificial plants only need periodic cleaning with a soft cloth to remove dust. They don't need water or sunlight."
        },
        {
          question: isArabic ? "هل المنتجات مناسبة للاستخدام الخارجي؟" : "Are the products suitable for outdoor use?",
          answer: isArabic
            ? "معظم منتجاتنا مقاومة للأشعة فوق البنفسجية ومناسبة للاستخدام الخارجي. يرجى التحقق من وصف المنتج للتفاصيل."
            : "Most of our products are UV-resistant and suitable for outdoor use. Please check the product description for details."
        },
      ]
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: isArabic ? "الدعم والتواصل" : "Support & Contact",
      faqs: [
        {
          question: isArabic ? "كيف يمكنني التواصل معكم؟" : "How can I contact you?",
          answer: isArabic
            ? "يمكنك التواصل معنا عبر واتساب على +971547751901، أو من خلال صفحة اتصل بنا، أو عبر وسائل التواصل الاجتماعي."
            : "You can contact us via WhatsApp at +971547751901, through our Contact Us page, or via social media."
        },
        {
          question: isArabic ? "ما هي ساعات العمل؟" : "What are your working hours?",
          answer: isArabic
            ? "نحن متاحون من السبت إلى الخميس من 9 صباحًا حتى 9 مساءً. الجمعة من 2 ظهرًا حتى 9 مساءً."
            : "We are available Saturday to Thursday from 9 AM to 9 PM. Friday from 2 PM to 9 PM."
        },
        {
          question: isArabic ? "هل يمكنني طلب منتج مخصص؟" : "Can I request a custom product?",
          answer: isArabic
            ? "نعم! نقدم خدمة الطلبات المخصصة. يمكنك إرسال طلبك عبر زر 'طلب مخصص' أو التواصل معنا مباشرة."
            : "Yes! We offer custom order service. You can submit your request via the 'Custom Request' button or contact us directly."
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={isArabic ? "rtl" : "ltr"}>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#2d5a3d] to-[#1a3d2a] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {isArabic 
                  ? "ابحث عن إجابات لأسئلتك الأكثر شيوعًا حول منتجاتنا وخدماتنا"
                  : "Find answers to your most common questions about our products and services"
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2d5a3d]/10 rounded-lg flex items-center justify-center text-[#2d5a3d]">
                        {category.icon}
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {category.title}
                      </h2>
                    </div>
                  </div>

                  {/* FAQs */}
                  <Accordion type="single" collapsible className="px-2">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                          <span className="font-medium text-gray-900 text-sm md:text-base">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 text-center bg-gradient-to-br from-[#2d5a3d] to-[#1a3d2a] rounded-2xl p-8 md:p-12 text-white"
            >
              <h3 className="text-2xl font-bold mb-3">
                {isArabic ? "لم تجد إجابتك؟" : "Didn't find your answer?"}
              </h3>
              <p className="text-white/80 mb-6">
                {isArabic 
                  ? "تواصل معنا مباشرة وسنساعدك في أقرب وقت ممكن"
                  : "Contact us directly and we'll help you as soon as possible"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/+971547751901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {isArabic ? "واتساب" : "WhatsApp"}
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
                >
                  {isArabic ? "صفحة الاتصال" : "Contact Page"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;