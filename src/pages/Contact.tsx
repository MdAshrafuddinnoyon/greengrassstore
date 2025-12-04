import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, ArrowRight, Sparkles, CheckCircle2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["Dubai, UAE", "Al Quoz Industrial Area 3"],
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+971 54 775 1901"],
      color: "from-blue-500 to-indigo-600",
      href: "tel:+971547751901",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@greengrassstore.com"],
      color: "from-purple-500 to-pink-600",
      href: "mailto:info@greengrassstore.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Sat-Thu: 9AM-9PM", "Fri: 2PM-9PM"],
      color: "from-orange-500 to-red-600",
    },
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Chat now",
      href: "https://wa.me/971547751901",
      color: "bg-[#25D366]",
      hoverColor: "hover:bg-[#20BD5A]",
    },
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "+971 54 775 1901",
      href: "tel:+971547751901",
      color: "bg-[#2d5a3d]",
      hoverColor: "hover:bg-[#234830]",
    },
    {
      icon: Instagram,
      title: "Instagram",
      subtitle: "@greengrass_decor",
      href: "https://www.instagram.com/greengrass_decor",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      hoverColor: "hover:opacity-90",
    },
    {
      icon: Facebook,
      title: "Facebook",
      subtitle: "Green Grass Store",
      href: "https://www.facebook.com/greengrassstore",
      color: "bg-[#1877F2]",
      hoverColor: "hover:bg-[#166FE5]",
    },
  ];

  const features = [
    "Free consultation for bulk orders",
    "Same day delivery in Dubai",
    "Expert plant care advice",
    "Corporate gifting solutions",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Modern Split Design */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d5a3d] via-[#1a3d28] to-[#0f2418]" />
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          
          <div className="relative container mx-auto px-4 py-20 md:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium text-sm uppercase tracking-wider">
                    Get in Touch
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                  We'd Love to<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
                    Hear From You
                  </span>
                </h1>
                <p className="text-lg text-white/80 mb-8 max-w-md">
                  Have questions about our plants, pots, or services? Our team is here to help you create your perfect green space.
                </p>
                
                {/* Features List */}
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Contact Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="group"
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        className="block bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/20 transition-all duration-300"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-white/70 text-sm">{detail}</p>
                        ))}
                      </a>
                    ) : (
                      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4`}>
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-white/70 text-sm">{detail}</p>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Connect Bar */}
        <section className="bg-gray-50 py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {quickActions.map((action, idx) => (
                <motion.a
                  key={action.title}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-3 px-6 py-3 ${action.color} ${action.hoverColor} text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105`}
                >
                  <action.icon className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">{action.title}</p>
                    <p className="text-xs text-white/80">{action.subtitle}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content - Form & Map */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#2d5a3d]/10 flex items-center justify-center">
                      <Send className="w-5 h-5 text-[#2d5a3d]" />
                    </div>
                    <span className="text-[#2d5a3d] font-semibold text-sm uppercase tracking-wider">
                      Send Message
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                    Contact Form
                  </h2>
                  <p className="text-gray-500 mb-8">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          required
                          className="h-12 rounded-xl border-gray-200 focus:border-[#2d5a3d] focus:ring-[#2d5a3d]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          required
                          className="h-12 rounded-xl border-gray-200 focus:border-[#2d5a3d] focus:ring-[#2d5a3d]/20"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                          className="h-12 rounded-xl border-gray-200 focus:border-[#2d5a3d] focus:ring-[#2d5a3d]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="How can we help?"
                          required
                          className="h-12 rounded-xl border-gray-200 focus:border-[#2d5a3d] focus:ring-[#2d5a3d]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us more about your inquiry..."
                        required
                        className="min-h-[150px] rounded-xl border-gray-200 focus:border-[#2d5a3d] focus:ring-[#2d5a3d]/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-[#2d5a3d] hover:bg-[#234830] text-white font-semibold rounded-xl text-lg shadow-lg shadow-[#2d5a3d]/20 hover:shadow-xl transition-all"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          Send Message
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Sidebar - Map & Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Map */}
                <div className="rounded-3xl overflow-hidden shadow-xl h-[300px] border border-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.7395738558244!2d55.26!3d25.20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzAwLjAiTiA1NcKwMTUnMzYuMCJF!5e0!3m2!1sen!2sae!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Store Location"
                  />
                </div>

                {/* Store Info Card */}
                <div className="bg-gradient-to-br from-[#2d5a3d] to-[#1a3d28] rounded-3xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Green Grass Store</h3>
                      <p className="text-sm text-white/70">Dubai, UAE</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-emerald-400" />
                      <p className="text-white/90">Al Quoz Industrial Area 3, Dubai, UAE</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <a href="tel:+971547751901" className="text-white/90 hover:text-white">+971 54 775 1901</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <a href="mailto:info@greengrassstore.com" className="text-white/90 hover:text-white">info@greengrassstore.com</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 mt-0.5 text-emerald-400" />
                      <div className="text-white/90">
                        <p>Sat - Thu: 9:00 AM - 9:00 PM</p>
                        <p>Friday: 2:00 PM - 9:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <a
                      href="https://wa.me/971547751901"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] rounded-xl font-semibold hover:bg-[#20BD5A] transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* FAQ Teaser */}
                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">Have Questions?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Check out our FAQ page for quick answers to common questions.
                  </p>
                  <a
                    href="/faq"
                    className="inline-flex items-center gap-2 text-[#2d5a3d] font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Visit FAQ Page
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
