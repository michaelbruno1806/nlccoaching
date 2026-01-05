import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  LogOut, Save, Upload, Image, RefreshCw, 
  Home, Trash2, Plus, Globe,
  CheckCircle, AlertCircle, Lightbulb,
  Dumbbell, Brain, UserCircle, LayoutDashboard, Mail,
  Phone, MapPin, MessageCircle,
  Sparkles, User, Users
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ContentItem {
  id: string;
  content_key: string;
  content_value: string;
  language: string;
}

interface ImageItem {
  id: string;
  image_key: string;
  image_url: string;
  alt_text: string | null;
}

// Section configurations with friendly labels
const sectionConfigs = {
  hero: {
    title: "Hero Section",
    description: "The main banner at the top of your homepage",
    icon: LayoutDashboard,
    fields: [
      { key: "hero_title", label: "Main Title", type: "text", placeholder: "Your powerful headline" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", placeholder: "Supporting text under the title" },
      { key: "hero_cta", label: "Button Text", type: "text", placeholder: "Call to action button text" },
    ]
  },
  about: {
    title: "About Section",
    description: "Tell visitors who you are and what you do",
    icon: UserCircle,
    fields: [
      { key: "about_badge", label: "Section Badge", type: "text", placeholder: "Who We Are" },
      { key: "about_title", label: "Main Title", type: "text", placeholder: "Optimize your journey to performance" },
      { key: "about_paragraph_1", label: "First Paragraph", type: "textarea", placeholder: "Your main description..." },
      { key: "about_paragraph_2", label: "Second Paragraph", type: "textarea", placeholder: "Additional details..." },
      { key: "about_button", label: "Button Text", type: "text", placeholder: "Learn More" },
    ],
    stats: [
      { key: "about_stat_value", labelKey: "about_stat_label", defaultValue: "10+", defaultLabel: "Years of experience" },
    ]
  },
  services: {
    title: "Services Section",
    description: "Your coaching programs and offerings",
    icon: Dumbbell,
    services: [
      { 
        id: "personalized",
        icon: Sparkles,
        titleKey: "service_1_title",
        descKey: "service_1_description",
        defaultTitle: "Personalized Program",
        defaultDesc: "Tailored support to achieve your specific goals",
        features: ["service_1_feature_1", "service_1_feature_2", "service_1_feature_3", "service_1_feature_4"]
      },
      { 
        id: "individual",
        icon: User,
        titleKey: "service_2_title",
        descKey: "service_2_description",
        defaultTitle: "Individual Coaching",
        defaultDesc: "Intensive sessions to maximize your potential",
        features: ["service_2_feature_1", "service_2_feature_2", "service_2_feature_3", "service_2_feature_4"]
      },
      { 
        id: "group",
        icon: Users,
        titleKey: "service_3_title",
        descKey: "service_3_description",
        defaultTitle: "Small Groups",
        defaultDesc: "Up to 4 people for quality support",
        features: ["service_3_feature_1", "service_3_feature_2", "service_3_feature_3", "service_3_feature_4"]
      },
    ]
  },
  philosophy: {
    title: "Philosophy Section",
    description: "Your coaching approach and values",
    icon: Brain,
    items: [
      { 
        id: "performance",
        titleKey: "philosophy_1_title",
        descKey: "philosophy_1_description",
        defaultTitle: "Sustainable Performance",
        defaultDesc: "Build strength, mobility, and technique without injury"
      },
      { 
        id: "personalized",
        titleKey: "philosophy_2_title",
        descKey: "philosophy_2_description",
        defaultTitle: "Personalized Support",
        defaultDesc: "Each program is tailored to your goals"
      },
      { 
        id: "results",
        titleKey: "philosophy_3_title",
        descKey: "philosophy_3_description",
        defaultTitle: "Measurable Results",
        defaultDesc: "Clear progress indicators and quantifiable goals"
      },
    ]
  },
  coach: {
    title: "Coach Bio",
    description: "Information about you, the coach",
    icon: UserCircle,
    fields: [
      { key: "coach_title", label: "Section Title", type: "text", placeholder: "Your Coach" },
      { key: "coach_headline", label: "Headline", type: "text", placeholder: "Sports coach and life mentor" },
      { key: "coach_bio_1", label: "First Paragraph", type: "textarea", placeholder: "Your introduction..." },
      { key: "coach_bio_2", label: "Second Paragraph", type: "textarea", placeholder: "Your experience..." },
    ],
    stats: [
      { key: "coach_stat_1_value", labelKey: "coach_stat_1_label", defaultValue: "500+", defaultLabel: "Clients transformed" },
      { key: "coach_stat_2_value", labelKey: "coach_stat_2_label", defaultValue: "10+", defaultLabel: "Years of experience" },
      { key: "coach_stat_3_value", labelKey: "coach_stat_3_label", defaultValue: "5000+", defaultLabel: "Sessions completed" },
    ]
  },
  contact: {
    title: "Contact Section",
    description: "Your contact information and form settings",
    icon: Mail,
    fields: [
      { key: "contact_title", label: "Section Title", type: "text", placeholder: "Ready to transform your life?" },
      { key: "contact_subtitle", label: "Section Subtitle", type: "textarea", placeholder: "Contact us to discuss your goals..." },
    ],
    contactInfo: [
      { key: "contact_phone", label: "Phone Number", icon: Phone, placeholder: "+33 6 12 34 56 78" },
      { key: "contact_email", label: "Email Address", icon: Mail, placeholder: "contact@nlccoaching.com" },
      { key: "contact_location", label: "Location", icon: MapPin, placeholder: "Paris, France" },
      { key: "contact_whatsapp", label: "WhatsApp Number", icon: MessageCircle, placeholder: "33612345678 (without +)" },
    ],
    discoverySession: [
      { key: "discovery_title", label: "Discovery Box Title", type: "text", placeholder: "Discovery Session" },
      { key: "discovery_description", label: "Discovery Box Description", type: "textarea", placeholder: "Book your first free session..." },
      { key: "discovery_button", label: "Discovery Button Text", type: "text", placeholder: "Book now" },
    ]
  }
};

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentLang, setCurrentLang] = useState('en');
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [newImageKey, setNewImageKey] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchContents();
      fetchImages();
    }
  }, [user, isAdmin]);

  const fetchContents = async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('content_key');
    
    if (!error && data) {
      setContents(data);
    }
  };

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('site_images')
      .select('*')
      .order('image_key');
    
    if (!error && data) {
      setImages(data);
    }
  };

  const getContentValue = (key: string, lang: string = currentLang): string => {
    const item = contents.find(c => c.content_key === key && c.language === lang);
    return item?.content_value || '';
  };

  const updateLocalContent = (key: string, value: string, lang: string = currentLang) => {
    setContents(prev => {
      const existing = prev.find(c => c.content_key === key && c.language === lang);
      if (existing) {
        return prev.map(c => 
          c.content_key === key && c.language === lang 
            ? { ...c, content_value: value } 
            : c
        );
      } else {
        return [...prev, { id: `temp-${key}-${lang}`, content_key: key, content_value: value, language: lang }];
      }
    });
  };

  const handleSaveContent = async (key: string, value: string, lang: string = currentLang) => {
    setSavingKeys(prev => new Set(prev).add(key));
    
    const existing = contents.find(c => c.content_key === key && c.language === lang);
    
    let error;
    if (existing && !existing.id.startsWith('temp-')) {
      const result = await supabase
        .from('site_content')
        .update({ content_value: value, updated_by: user?.id })
        .eq('id', existing.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('site_content')
        .upsert({
          content_key: key,
          content_value: value,
          language: lang,
          updated_by: user?.id
        }, { onConflict: 'content_key,language' });
      error = result.error;
    }

    setSavingKeys(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });

    if (error) {
      toast.error('Failed to save. Please try again.');
    } else {
      toast.success('Saved successfully!');
      setSavedKeys(prev => new Set(prev).add(key));
      setTimeout(() => {
        setSavedKeys(prev => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }, 2000);
      fetchContents();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !newImageKey) {
      toast.error('Please enter a name for your image first');
      return;
    }

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${newImageKey.toLowerCase().replace(/\s+/g, '_')}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error('Failed to upload image. Please try again.');
      setUploadingImage(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('site-images')
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase
      .from('site_images')
      .upsert({
        image_key: newImageKey.toLowerCase().replace(/\s+/g, '_'),
        image_url: urlData.publicUrl,
        alt_text: newImageAlt,
        updated_by: user?.id
      }, { onConflict: 'image_key' });

    if (insertError) {
      toast.error('Failed to save image. Please try again.');
    } else {
      toast.success('Image uploaded successfully!');
      setNewImageKey('');
      setNewImageAlt('');
      fetchImages();
    }
    setUploadingImage(false);
  };

  const handleDeleteImage = async (item: ImageItem) => {
    const fileName = item.image_url.split('/').pop();
    if (fileName) {
      await supabase.storage.from('site-images').remove([fileName]);
    }

    const { error } = await supabase
      .from('site_images')
      .delete()
      .eq('id', item.id);

    if (error) {
      toast.error('Failed to delete image. Please try again.');
    } else {
      toast.success('Image deleted successfully!');
      fetchImages();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const renderSaveButton = (key: string, value: string) => (
    <Button
      size="sm"
      onClick={() => handleSaveContent(key, value)}
      disabled={savingKeys.has(key)}
      className="min-w-[90px]"
    >
      {savingKeys.has(key) ? (
        <><RefreshCw className="w-4 h-4 mr-1 animate-spin" /> Saving</>
      ) : savedKeys.has(key) ? (
        <><CheckCircle className="w-4 h-4 mr-1" /> Saved!</>
      ) : (
        <><Save className="w-4 h-4 mr-1" /> Save</>
      )}
    </Button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">NLC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Manage your website content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <div className="hidden sm:block text-sm text-muted-foreground border-l border-border pl-3">
              {user.email}
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">Welcome to your Admin Panel!</h2>
              <p className="text-muted-foreground text-sm">
                Edit each section of your website below. Changes save instantly when you click Save.
              </p>
            </div>
            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-background rounded-lg p-1 border border-border">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentLang === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setCurrentLang('fr')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentLang === 'fr' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                🇫🇷 French
              </button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="flex flex-wrap justify-start gap-2 bg-transparent h-auto p-0">
            <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2">
              <UserCircle className="w-4 h-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2">
              <Dumbbell className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="philosophy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2">
              <Brain className="w-4 h-4 mr-2" />
              Philosophy
            </TabsTrigger>
            <TabsTrigger value="coach" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2">
              <UserCircle className="w-4 h-4 mr-2" />
              Coach Bio
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="images" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2">
              <Image className="w-4 h-4 mr-2" />
              Images
            </TabsTrigger>
          </TabsList>

          {/* HERO SECTION TAB */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                  Hero Section
                </CardTitle>
                <CardDescription>The main banner at the top of your homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sectionConfigs.hero.fields.map((field) => {
                  const value = getContentValue(field.key);
                  return (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">{field.label}</Label>
                        {renderSaveButton(field.key, value)}
                      </div>
                      {field.type === 'textarea' ? (
                        <Textarea
                          value={value}
                          onChange={(e) => updateLocalContent(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="min-h-[100px]"
                        />
                      ) : (
                        <Input
                          value={value}
                          onChange={(e) => updateLocalContent(field.key, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABOUT SECTION TAB */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-primary" />
                  About Section
                </CardTitle>
                <CardDescription>Tell visitors who you are and what you do</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sectionConfigs.about.fields.map((field) => {
                  const value = getContentValue(field.key);
                  return (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">{field.label}</Label>
                        {renderSaveButton(field.key, value)}
                      </div>
                      {field.type === 'textarea' ? (
                        <Textarea
                          value={value}
                          onChange={(e) => updateLocalContent(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="min-h-[100px]"
                        />
                      ) : (
                        <Input
                          value={value}
                          onChange={(e) => updateLocalContent(field.key, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  );
                })}

                {/* Stats */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg mb-4">Statistics Card</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The floating stats card displayed over the images
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {sectionConfigs.about.stats.map((stat) => {
                      const valueContent = getContentValue(stat.key) || stat.defaultValue;
                      const labelContent = getContentValue(stat.labelKey) || stat.defaultLabel;
                      
                      return (
                        <div key={stat.key} className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                          <div>
                            <Label className="text-sm text-muted-foreground">Number/Value</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                value={valueContent}
                                onChange={(e) => updateLocalContent(stat.key, e.target.value)}
                                placeholder={stat.defaultValue}
                                className="text-center text-xl font-bold"
                              />
                              {renderSaveButton(stat.key, valueContent)}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Label</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                value={labelContent}
                                onChange={(e) => updateLocalContent(stat.labelKey, e.target.value)}
                                placeholder={stat.defaultLabel}
                                className="text-sm"
                              />
                              {renderSaveButton(stat.labelKey, labelContent)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SERVICES SECTION TAB */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-primary" />
                  Services Section
                </CardTitle>
                <CardDescription>Your coaching programs and offerings - edit each service below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {sectionConfigs.services.services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  const titleValue = getContentValue(service.titleKey) || service.defaultTitle;
                  const descValue = getContentValue(service.descKey) || service.defaultDesc;
                  
                  return (
                    <div key={service.id} className="p-6 rounded-xl border border-border bg-muted/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <ServiceIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">Service {index + 1}</h3>
                      </div>
                      
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Service Title</Label>
                            {renderSaveButton(service.titleKey, titleValue)}
                          </div>
                          <Input
                            value={titleValue}
                            onChange={(e) => updateLocalContent(service.titleKey, e.target.value)}
                            placeholder={service.defaultTitle}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Service Description</Label>
                            {renderSaveButton(service.descKey, descValue)}
                          </div>
                          <Textarea
                            value={descValue}
                            onChange={(e) => updateLocalContent(service.descKey, e.target.value)}
                            placeholder={service.defaultDesc}
                            className="min-h-[80px]"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-muted-foreground">Features (bullet points)</Label>
                          {service.features.map((featureKey, fIndex) => {
                            const featureValue = getContentValue(featureKey);
                            return (
                              <div key={featureKey} className="flex items-center gap-2">
                                <span className="text-muted-foreground text-sm w-6">{fIndex + 1}.</span>
                                <Input
                                  value={featureValue}
                                  onChange={(e) => updateLocalContent(featureKey, e.target.value)}
                                  placeholder={`Feature ${fIndex + 1}`}
                                  className="flex-1"
                                />
                                {renderSaveButton(featureKey, featureValue)}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* PHILOSOPHY SECTION TAB */}
          <TabsContent value="philosophy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Philosophy Section
                </CardTitle>
                <CardDescription>Your coaching approach and core values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sectionConfigs.philosophy.items.map((item, index) => {
                  const titleValue = getContentValue(item.titleKey) || item.defaultTitle;
                  const descValue = getContentValue(item.descKey) || item.defaultDesc;
                  
                  return (
                    <div key={item.id} className="p-6 rounded-xl border border-border bg-muted/30">
                      <h3 className="font-semibold text-lg mb-4">Philosophy Point {index + 1}</h3>
                      
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Title</Label>
                            {renderSaveButton(item.titleKey, titleValue)}
                          </div>
                          <Input
                            value={titleValue}
                            onChange={(e) => updateLocalContent(item.titleKey, e.target.value)}
                            placeholder={item.defaultTitle}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Description</Label>
                            {renderSaveButton(item.descKey, descValue)}
                          </div>
                          <Textarea
                            value={descValue}
                            onChange={(e) => updateLocalContent(item.descKey, e.target.value)}
                            placeholder={item.defaultDesc}
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* COACH BIO TAB */}
          <TabsContent value="coach" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-primary" />
                  Coach Bio
                </CardTitle>
                <CardDescription>Information about you, the coach</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sectionConfigs.coach.fields.map((field) => {
                  const value = getContentValue(field.key);
                  return (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">{field.label}</Label>
                        {renderSaveButton(field.key, value)}
                      </div>
                      {field.type === 'textarea' ? (
                        <Textarea
                          value={value}
                          onChange={(e) => updateLocalContent(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="min-h-[100px]"
                        />
                      ) : (
                        <Input
                          value={value}
                          onChange={(e) => updateLocalContent(field.key, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  );
                })}

                {/* Stats Section */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg mb-4">Your Statistics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Showcase your experience with impressive numbers
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {sectionConfigs.coach.stats.map((stat, index) => {
                      const valueContent = getContentValue(stat.key) || stat.defaultValue;
                      const labelContent = getContentValue(stat.labelKey) || stat.defaultLabel;
                      
                      return (
                        <div key={stat.key} className="p-4 rounded-xl border border-border bg-muted/30">
                          <Label className="text-sm text-muted-foreground">Stat {index + 1}</Label>
                          <div className="mt-2 space-y-3">
                            <div>
                              <Input
                                value={valueContent}
                                onChange={(e) => updateLocalContent(stat.key, e.target.value)}
                                placeholder="500+"
                                className="text-center text-xl font-bold"
                              />
                              {renderSaveButton(stat.key, valueContent)}
                            </div>
                            <div>
                              <Input
                                value={labelContent}
                                onChange={(e) => updateLocalContent(stat.labelKey, e.target.value)}
                                placeholder={stat.defaultLabel}
                                className="text-center text-sm"
                              />
                              {renderSaveButton(stat.labelKey, labelContent)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTACT SECTION TAB */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Contact Section
                </CardTitle>
                <CardDescription>Your contact information and messaging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Section Header */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Section Header</h3>
                  {sectionConfigs.contact.fields.map((field) => {
                    const value = getContentValue(field.key);
                    return (
                      <div key={field.key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-base">{field.label}</Label>
                          {renderSaveButton(field.key, value)}
                        </div>
                        {field.type === 'textarea' ? (
                          <Textarea
                            value={value}
                            onChange={(e) => updateLocalContent(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="min-h-[80px]"
                          />
                        ) : (
                          <Input
                            value={value}
                            onChange={(e) => updateLocalContent(field.key, e.target.value)}
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Contact Information */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your contact details shown on the website
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {sectionConfigs.contact.contactInfo.map((info) => {
                      const InfoIcon = info.icon;
                      const value = getContentValue(info.key);
                      return (
                        <div key={info.key} className="p-4 rounded-xl border border-border bg-muted/30">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <InfoIcon className="w-4 h-4 text-primary" />
                            </div>
                            <Label>{info.label}</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={value}
                              onChange={(e) => updateLocalContent(info.key, e.target.value)}
                              placeholder={info.placeholder}
                              className="flex-1"
                            />
                            {renderSaveButton(info.key, value)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Discovery Session Box */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg mb-4">Discovery Session Box</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The promotional box that encourages visitors to book a free session
                  </p>
                  <div className="p-6 rounded-xl border border-primary/30 bg-primary/5 space-y-4">
                    {sectionConfigs.contact.discoverySession.map((field) => {
                      const value = getContentValue(field.key);
                      return (
                        <div key={field.key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>{field.label}</Label>
                            {renderSaveButton(field.key, value)}
                          </div>
                          {field.type === 'textarea' ? (
                            <Textarea
                              value={value}
                              onChange={(e) => updateLocalContent(field.key, e.target.value)}
                              placeholder={field.placeholder}
                              className="min-h-[60px]"
                            />
                          ) : (
                            <Input
                              value={value}
                              onChange={(e) => updateLocalContent(field.key, e.target.value)}
                              placeholder={field.placeholder}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* IMAGES TAB */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload New Image
                </CardTitle>
                <CardDescription>Upload images to use on your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="imageKey">Name for this image</Label>
                    <Input
                      id="imageKey"
                      value={newImageKey}
                      onChange={(e) => setNewImageKey(e.target.value)}
                      placeholder="e.g., Coach Photo"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageAlt">Description (for accessibility)</Label>
                    <Input
                      id="imageAlt"
                      value={newImageAlt}
                      onChange={(e) => setNewImageAlt(e.target.value)}
                      placeholder="Describe the image..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageFile">Choose image file</Label>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={!newImageKey || uploadingImage}
                      className="cursor-pointer mt-1"
                    />
                  </div>
                </div>
                {!newImageKey && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2 mt-3">
                    <AlertCircle className="w-4 h-4" />
                    Please enter a name for your image before uploading
                  </p>
                )}
                {uploadingImage && (
                  <p className="text-sm text-primary flex items-center gap-2 mt-3">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Uploading your image...
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Website Images</CardTitle>
                    <CardDescription>Manage all images used on your website</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchImages}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {images.length === 0 ? (
                  <div className="border border-dashed border-border rounded-2xl p-12 text-center">
                    <Image className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No images uploaded yet</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {images.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border border-border rounded-xl overflow-hidden"
                      >
                        <div className="aspect-video bg-muted">
                          <img
                            src={item.image_url}
                            alt={item.alt_text || item.image_key}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">
                            {item.image_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          {item.alt_text && (
                            <p className="text-sm text-muted-foreground mb-3">{item.alt_text}</p>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="w-full text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete this image?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this image. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteImage(item)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
