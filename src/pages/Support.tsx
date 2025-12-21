import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LifeBuoy, Phone, Mail, MessageSquare, PackageCheck, Clock3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const contactChannels = [
  {
    icon: Phone,
    title: "Call or WhatsApp",
    description: "+971 54 775 1901 (9am - 10pm GST)",
    href: "https://wa.me/971547751901",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@greengrassstore.com",
    href: "mailto:support@greengrassstore.com",
  },
  {
    icon: MessageSquare,
    title: "Chat",
    description: "Tap the chat bubble on any page",
    href: "#",
  },
];

const steps = [
  {
    icon: Clock3,
    title: "Quick Resolutions",
    description: "Most questions are answered within 1 business day.",
  },
  {
    icon: PackageCheck,
    title: "Returns & Exchanges",
    description: "Eligible within 7 days for unused items in original packaging.",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed Support",
    description: "We track every case until your issue is closed.",
  },
];

const Support = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" dir={isArabic ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#2d5a3d]/10 text-[#2d5a3d] text-sm font-medium">
              <LifeBuoy className="w-4 h-4" />
              {isArabic ? "الدعم والمرتجعات" : "Support & Returns"}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
              {isArabic ? "نحن هنا للمساعدة" : "We are here to help"}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isArabic
                ? "تواصل معنا لأي استفسار حول الطلبات، الشحن، أو المرتجعات."
                : "Reach out for anything about orders, shipping, returns, or product care."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {contactChannels.map((channel, index) => (
              <motion.a
                key={channel.title}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-[#2d5a3d] transition-colors h-full">
                  <CardContent className="pt-6 space-y-3">
                    <channel.icon className="w-8 h-8 text-[#2d5a3d]" />
                    <h3 className="text-lg font-semibold">{channel.title}</h3>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "سياسة المرتجعات" : "Returns & Exchanges"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>
                  {isArabic
                    ? "يمكن إعادة أو استبدال المنتجات غير المستخدمة خلال 7 أيام من الاستلام. يرجى إبقاء العبوة الأصلية والفاتورة."
                    : "You can return or exchange unused items within 7 days of delivery. Keep the original packaging and invoice."}
                </p>
                <ul className="list-disc pl-4 space-y-2">
                  <li>{isArabic ? "المنتجات المصنوعة حسب الطلب غير قابلة للإرجاع" : "Custom or special-order items are not returnable."}</li>
                  <li>{isArabic ? "التلف أثناء الشحن مغطى بالكامل" : "Transit damage is fully covered; report within 48 hours."}</li>
                  <li>{isArabic ? "استرداد المبلغ يتم خلال 5-7 أيام عمل" : "Refunds are processed in 5-7 business days."}</li>
                </ul>
                <div className="flex gap-3 flex-wrap pt-2">
                  <Button asChild>
                    <Link to="/returns">{isArabic ? "قراءة السياسة" : "View return policy"}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:support@greengrassstore.com">
                      {isArabic ? "بدء طلب إرجاع" : "Start a return"}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "مشاكل الطلبات" : "Order issues"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>{isArabic ? "إذا واجهت مشكلة في الطلب، نتعامل معها كالتالي:" : "If something went wrong with your order, we handle it like this:"}</p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>{isArabic ? "التحقق من الحالة والتتبع" : "Verify status and tracking details."}</li>
                  <li>{isArabic ? "تصحيح العنوان أو إعادة الشحن" : "Fix the address or resend the item if needed."}</li>
                  <li>{isArabic ? "تأكيد الحسم أو الاسترداد" : "Confirm replacement, store credit, or refund."}</li>
                </ol>
                <div className="pt-2 flex gap-3 flex-wrap">
                  <Button variant="outline" asChild>
                    <Link to="/track-order">{isArabic ? "تتبع طلب" : "Track your order"}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://wa.me/971547751901" target="_blank" rel="noreferrer">
                      {isArabic ? "إبلاغ عن مشكلة" : "Report an issue"}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "ما تتوقعه منا" : "What to expect"}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="p-4 rounded-lg bg-white shadow-sm border"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <step.icon className="w-6 h-6 text-[#2d5a3d] mb-3" />
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
