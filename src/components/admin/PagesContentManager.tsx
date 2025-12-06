import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, Save, RefreshCw, Plus, Trash2, HelpCircle, RotateCcw, 
  Shield, Scale, Building2, Phone, FileText, GripVertical
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: string;
  order: number;
}

interface FAQCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  order: number;
}

interface PolicySection {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  icon: string;
  order: number;
}

interface AboutPageContent {
  heroTitle: string;
  heroTitleAr: string;
  heroSubtitle: string;
  heroSubtitleAr: string;
  storyTitle: string;
  storyTitleAr: string;
  storyContent: string;
  storyContentAr: string;
  yearsInBusiness: string;
  values: Array<{
    id: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    icon: string;
  }>;
  stats: Array<{
    id: string;
    value: string;
    label: string;
    labelAr: string;
  }>;
}

interface ContactPageContent {
  heroTitle: string;
  heroTitleAr: string;
  heroSubtitle: string;
  heroSubtitleAr: string;
  address: string;
  addressAr: string;
  phone: string;
  email: string;
  workingHours: string;
  workingHoursAr: string;
  mapEmbedUrl: string;
  features: string[];
  featuresAr: string[];
}

export const PagesContentManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("faq");

  // FAQ State
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([
    { id: '1', name: 'Shipping & Delivery', nameAr: 'الشحن والتوصيل', icon: 'truck', order: 1 },
    { id: '2', name: 'Returns & Exchange', nameAr: 'الإرجاع والاستبدال', icon: 'refresh', order: 2 },
    { id: '3', name: 'Payment', nameAr: 'الدفع', icon: 'credit-card', order: 3 },
  ]);

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    { 
      id: '1', 
      question: 'What areas do you deliver to?', 
      questionAr: 'ما هي مناطق التوصيل؟',
      answer: 'We deliver across all UAE including Dubai, Abu Dhabi, Sharjah...',
      answerAr: 'نقوم بالتوصيل إلى جميع أنحاء الإمارات...',
      category: '1',
      order: 1 
    },
  ]);

  // Return Policy State
  const [returnPolicySections, setReturnPolicySections] = useState<PolicySection[]>([
    {
      id: '1',
      title: 'Eligible for Return',
      titleAr: 'المؤهل للإرجاع',
      content: 'Items in original, unused condition...',
      contentAr: 'العناصر في حالتها الأصلية وغير المستخدمة...',
      icon: 'check-circle',
      order: 1
    },
  ]);

  // Privacy Policy State
  const [privacySections, setPrivacySections] = useState<PolicySection[]>([
    {
      id: '1',
      title: 'Information We Collect',
      titleAr: 'المعلومات التي نجمعها',
      content: 'We collect information you provide directly to us...',
      contentAr: 'نجمع المعلومات التي تقدمها لنا مباشرة...',
      icon: 'file-text',
      order: 1
    },
  ]);

  // Terms of Service State
  const [termsSections, setTermsSections] = useState<PolicySection[]>([
    {
      id: '1',
      title: 'Acceptance of Terms',
      titleAr: 'قبول الشروط',
      content: 'By accessing and using Green Grass Store website...',
      contentAr: 'من خلال الوصول واستخدام موقع جرين جراس...',
      icon: 'file-text',
      order: 1
    },
  ]);

  // About Page State
  const [aboutContent, setAboutContent] = useState<AboutPageContent>({
    heroTitle: 'About Green Grass',
    heroTitleAr: 'عن جرين جراس',
    heroSubtitle: 'Bringing nature into every home across the UAE',
    heroSubtitleAr: 'نجلب الطبيعة إلى كل منزل في الإمارات',
    storyTitle: 'A Passion for Plants & Beautiful Spaces',
    storyTitleAr: 'شغف بالنباتات والمساحات الجميلة',
    storyContent: 'Founded in Dubai in 2018, Green Grass Store began with a simple mission...',
    storyContentAr: 'تأسست في دبي عام 2018، بدأ متجر جرين جراس بمهمة بسيطة...',
    yearsInBusiness: '6+',
    values: [
      { id: '1', title: 'Sustainability', titleAr: 'الاستدامة', description: 'Eco-friendly practices', descriptionAr: 'ممارسات صديقة للبيئة', icon: 'leaf' },
      { id: '2', title: 'Quality', titleAr: 'الجودة', description: 'Only the finest products', descriptionAr: 'أجود المنتجات فقط', icon: 'heart' },
    ],
    stats: [
      { id: '1', value: '10K+', label: 'Happy Customers', labelAr: 'عملاء سعداء' },
      { id: '2', value: '500+', label: 'Products', labelAr: 'منتج' },
    ]
  });

  // Contact Page State
  const [contactContent, setContactContent] = useState<ContactPageContent>({
    heroTitle: "We'd Love to Hear From You",
    heroTitleAr: 'يسعدنا سماعك',
    heroSubtitle: 'Have questions about our products?',
    heroSubtitleAr: 'هل لديك أسئلة حول منتجاتنا؟',
    address: 'Al Quoz Industrial Area 3, Dubai, UAE',
    addressAr: 'منطقة القوز الصناعية 3، دبي، الإمارات',
    phone: '+971 54 775 1901',
    email: 'info@greengrassstore.com',
    workingHours: 'Sat-Thu: 9AM-9PM, Fri: 2PM-9PM',
    workingHoursAr: 'السبت-الخميس: 9ص-9م، الجمعة: 2م-9م',
    mapEmbedUrl: 'https://www.google.com/maps/embed?...',
    features: ['Free consultation for bulk orders', 'Same day delivery in Dubai'],
    featuresAr: ['استشارة مجانية للطلبات بالجملة', 'توصيل في نفس اليوم في دبي']
  });

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      data?.forEach((setting) => {
        const value = setting.setting_value as Record<string, unknown>;
        switch (setting.setting_key) {
          case 'faq_categories':
            setFaqCategories(value as unknown as FAQCategory[]);
            break;
          case 'faq_items':
            setFaqItems(value as unknown as FAQItem[]);
            break;
          case 'return_policy_sections':
            setReturnPolicySections(value as unknown as PolicySection[]);
            break;
          case 'privacy_sections':
            setPrivacySections(value as unknown as PolicySection[]);
            break;
          case 'terms_sections':
            setTermsSections(value as unknown as PolicySection[]);
            break;
          case 'about_content':
            setAboutContent(value as unknown as AboutPageContent);
            break;
          case 'contact_content':
            setContactContent(value as unknown as ContactPageContent);
            break;
        }
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const saveContent = async (key: string, value: object) => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('setting_key', key)
        .single();

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ setting_value: JSON.parse(JSON.stringify(value)) })
          .eq('setting_key', key);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert({ setting_key: key, setting_value: JSON.parse(JSON.stringify(value)) });
        if (error) throw error;
      }
      
      toast.success('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  // FAQ Helpers
  const addFaqItem = () => {
    const newItem: FAQItem = {
      id: Date.now().toString(),
      question: 'New Question',
      questionAr: 'سؤال جديد',
      answer: 'Answer here...',
      answerAr: 'الإجابة هنا...',
      category: faqCategories[0]?.id || '1',
      order: faqItems.length + 1
    };
    setFaqItems([...faqItems, newItem]);
  };

  const removeFaqItem = (id: string) => {
    setFaqItems(faqItems.filter(item => item.id !== id));
  };

  const updateFaqItem = (id: string, field: keyof FAQItem, value: string | number) => {
    setFaqItems(faqItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Policy Section Helpers
  const addPolicySection = (setter: React.Dispatch<React.SetStateAction<PolicySection[]>>, current: PolicySection[]) => {
    const newSection: PolicySection = {
      id: Date.now().toString(),
      title: 'New Section',
      titleAr: 'قسم جديد',
      content: 'Content here...',
      contentAr: 'المحتوى هنا...',
      icon: 'file-text',
      order: current.length + 1
    };
    setter([...current, newSection]);
  };

  const removePolicySection = (setter: React.Dispatch<React.SetStateAction<PolicySection[]>>, current: PolicySection[], id: string) => {
    setter(current.filter(item => item.id !== id));
  };

  const updatePolicySection = (
    setter: React.Dispatch<React.SetStateAction<PolicySection[]>>, 
    current: PolicySection[], 
    id: string, 
    field: keyof PolicySection, 
    value: string | number
  ) => {
    setter(current.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap gap-1 h-auto p-1">
          <TabsTrigger value="faq" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="return" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Return Policy
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="terms" className="gap-2">
            <Scale className="w-4 h-4" />
            Terms
          </TabsTrigger>
          <TabsTrigger value="about" className="gap-2">
            <Building2 className="w-4 h-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Phone className="w-4 h-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                FAQ Management
              </CardTitle>
              <CardDescription>
                Manage frequently asked questions and their categories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">FAQ Items</h4>
                {faqItems.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">FAQ #{index + 1}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFaqItem(item.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Question (EN)</Label>
                        <Input
                          value={item.question}
                          onChange={(e) => updateFaqItem(item.id, 'question', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Question (AR)</Label>
                        <Input
                          value={item.questionAr}
                          onChange={(e) => updateFaqItem(item.id, 'questionAr', e.target.value)}
                          dir="rtl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Answer (EN)</Label>
                        <Textarea
                          value={item.answer}
                          onChange={(e) => updateFaqItem(item.id, 'answer', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Answer (AR)</Label>
                        <Textarea
                          value={item.answerAr}
                          onChange={(e) => updateFaqItem(item.id, 'answerAr', e.target.value)}
                          rows={3}
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addFaqItem} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ Item
                </Button>
              </div>

              <Button 
                onClick={() => {
                  saveContent('faq_items', faqItems);
                  saveContent('faq_categories', faqCategories);
                }}
                disabled={saving}
                className="w-full"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save FAQ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Return Policy Tab */}
        <TabsContent value="return">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" />
                Return Policy Page
              </CardTitle>
              <CardDescription>
                Manage return policy sections and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {returnPolicySections.map((section, index) => (
                <div key={section.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Section #{index + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePolicySection(setReturnPolicySections, returnPolicySections, section.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title (EN)</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updatePolicySection(setReturnPolicySections, returnPolicySections, section.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Title (AR)</Label>
                      <Input
                        value={section.titleAr}
                        onChange={(e) => updatePolicySection(setReturnPolicySections, returnPolicySections, section.id, 'titleAr', e.target.value)}
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (EN)</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => updatePolicySection(setReturnPolicySections, returnPolicySections, section.id, 'content', e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (AR)</Label>
                      <Textarea
                        value={section.contentAr}
                        onChange={(e) => updatePolicySection(setReturnPolicySections, returnPolicySections, section.id, 'contentAr', e.target.value)}
                        rows={4}
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => addPolicySection(setReturnPolicySections, returnPolicySections)} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>

              <Button 
                onClick={() => saveContent('return_policy_sections', returnPolicySections)}
                disabled={saving}
                className="w-full"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Return Policy
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Policy Tab */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy Policy Page
              </CardTitle>
              <CardDescription>
                Manage privacy policy sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {privacySections.map((section, index) => (
                <div key={section.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Section #{index + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePolicySection(setPrivacySections, privacySections, section.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title (EN)</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updatePolicySection(setPrivacySections, privacySections, section.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Title (AR)</Label>
                      <Input
                        value={section.titleAr}
                        onChange={(e) => updatePolicySection(setPrivacySections, privacySections, section.id, 'titleAr', e.target.value)}
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (EN)</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => updatePolicySection(setPrivacySections, privacySections, section.id, 'content', e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (AR)</Label>
                      <Textarea
                        value={section.contentAr}
                        onChange={(e) => updatePolicySection(setPrivacySections, privacySections, section.id, 'contentAr', e.target.value)}
                        rows={4}
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => addPolicySection(setPrivacySections, privacySections)} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>

              <Button 
                onClick={() => saveContent('privacy_sections', privacySections)}
                disabled={saving}
                className="w-full"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Privacy Policy
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Terms of Service Tab */}
        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Terms of Service Page
              </CardTitle>
              <CardDescription>
                Manage terms of service sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {termsSections.map((section, index) => (
                <div key={section.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Section #{index + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePolicySection(setTermsSections, termsSections, section.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title (EN)</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updatePolicySection(setTermsSections, termsSections, section.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Title (AR)</Label>
                      <Input
                        value={section.titleAr}
                        onChange={(e) => updatePolicySection(setTermsSections, termsSections, section.id, 'titleAr', e.target.value)}
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (EN)</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => updatePolicySection(setTermsSections, termsSections, section.id, 'content', e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content (AR)</Label>
                      <Textarea
                        value={section.contentAr}
                        onChange={(e) => updatePolicySection(setTermsSections, termsSections, section.id, 'contentAr', e.target.value)}
                        rows={4}
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => addPolicySection(setTermsSections, termsSections)} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>

              <Button 
                onClick={() => saveContent('terms_sections', termsSections)}
                disabled={saving}
                className="w-full"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Terms of Service
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                About Page
              </CardTitle>
              <CardDescription>
                Manage about page content and company information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Hero Section</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hero Title (EN)</Label>
                    <Input
                      value={aboutContent.heroTitle}
                      onChange={(e) => setAboutContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hero Title (AR)</Label>
                    <Input
                      value={aboutContent.heroTitleAr}
                      onChange={(e) => setAboutContent(prev => ({ ...prev, heroTitleAr: e.target.value }))}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hero Subtitle (EN)</Label>
                    <Textarea
                      value={aboutContent.heroSubtitle}
                      onChange={(e) => setAboutContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hero Subtitle (AR)</Label>
                    <Textarea
                      value={aboutContent.heroSubtitleAr}
                      onChange={(e) => setAboutContent(prev => ({ ...prev, heroSubtitleAr: e.target.value }))}
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* Our Story */}
              <div className="space-y-4">
                <h4 className="font-medium">Our Story</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Story Title (EN)</Label>
                    <Input
                      value={aboutContent.storyTitle}
                      onChange={(e) => setAboutContent(prev => ({ ...prev, storyTitle: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Story Title (AR)</Label>
                    <Input
                      value={aboutContent.storyTitleAr}
                      onChange={(e) => setAboutContent(prev => ({ ...prev, storyTitleAr: e.target.value }))}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Story Content (EN)</Label>
                    <Textarea
                      value={aboutContent.storyContent}
                      onChange={(e) => setAboutContent(prev => ({ ...prev, storyContent: e.target.value }))}
                      rows={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Story Content (AR)</Label>
                    <Textarea
                      value={aboutContent.storyContentAr}
                      onChange={(e) => setAboutContent(prev => ({ ...prev, storyContentAr: e.target.value }))}
                      rows={6}
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Years in Business</Label>
                  <Input
                    value={aboutContent.yearsInBusiness}
                    onChange={(e) => setAboutContent(prev => ({ ...prev, yearsInBusiness: e.target.value }))}
                    placeholder="6+"
                    className="max-w-[120px]"
                  />
                </div>
              </div>

              <Button 
                onClick={() => saveContent('about_content', aboutContent)}
                disabled={saving}
                className="w-full"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save About Page
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Contact Page
              </CardTitle>
              <CardDescription>
                Manage contact page content and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Hero Section</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hero Title (EN)</Label>
                    <Input
                      value={contactContent.heroTitle}
                      onChange={(e) => setContactContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hero Title (AR)</Label>
                    <Input
                      value={contactContent.heroTitleAr}
                      onChange={(e) => setContactContent(prev => ({ ...prev, heroTitleAr: e.target.value }))}
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="font-medium">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Address (EN)</Label>
                    <Input
                      value={contactContent.address}
                      onChange={(e) => setContactContent(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address (AR)</Label>
                    <Input
                      value={contactContent.addressAr}
                      onChange={(e) => setContactContent(prev => ({ ...prev, addressAr: e.target.value }))}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={contactContent.phone}
                      onChange={(e) => setContactContent(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={contactContent.email}
                      onChange={(e) => setContactContent(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Working Hours (EN)</Label>
                    <Input
                      value={contactContent.workingHours}
                      onChange={(e) => setContactContent(prev => ({ ...prev, workingHours: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Working Hours (AR)</Label>
                    <Input
                      value={contactContent.workingHoursAr}
                      onChange={(e) => setContactContent(prev => ({ ...prev, workingHoursAr: e.target.value }))}
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="space-y-2">
                <Label>Google Maps Embed URL</Label>
                <Textarea
                  value={contactContent.mapEmbedUrl}
                  onChange={(e) => setContactContent(prev => ({ ...prev, mapEmbedUrl: e.target.value }))}
                  rows={3}
                  placeholder="https://www.google.com/maps/embed?..."
                />
              </div>

              <Button 
                onClick={() => saveContent('contact_content', contactContent)}
                disabled={saving}
                className="w-full"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Contact Page
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="outline" onClick={fetchContent}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Content
        </Button>
      </div>
    </div>
  );
};
