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
  LogOut, Save, Upload, Image, Type, RefreshCw, 
  Home, HelpCircle, Trash2, Plus, Globe, FileText,
  CheckCircle, AlertCircle, Lightbulb
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

// Friendly names for content keys
const contentKeyLabels: Record<string, string> = {
  hero_title: "Homepage Main Title",
  hero_subtitle: "Homepage Subtitle",
  about_title: "About Section Title",
  about_description: "About Section Description",
  services_title: "Services Section Title",
  contact_title: "Contact Section Title",
  philosophy_title: "Philosophy Section Title",
};

const getContentLabel = (key: string) => contentKeyLabels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [newContentKey, setNewContentKey] = useState('');
  const [newContentValue, setNewContentValue] = useState('');
  const [newContentLang, setNewContentLang] = useState('en');
  const [newImageKey, setNewImageKey] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingContent, setSavingContent] = useState<string | null>(null);
  const [savedContent, setSavedContent] = useState<string | null>(null);

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

  const handleSaveContent = async (item: ContentItem) => {
    setSavingContent(item.id);
    const { error } = await supabase
      .from('site_content')
      .update({ content_value: item.content_value, updated_by: user?.id })
      .eq('id', item.id);

    if (error) {
      toast.error('Failed to save. Please try again.');
    } else {
      toast.success('Saved successfully!');
      setSavedContent(item.id);
      setTimeout(() => setSavedContent(null), 2000);
    }
    setSavingContent(null);
  };

  const handleAddContent = async () => {
    if (!newContentKey || !newContentValue) {
      toast.error('Please fill in all fields');
      return;
    }

    const { error } = await supabase
      .from('site_content')
      .insert({
        content_key: newContentKey.toLowerCase().replace(/\s+/g, '_'),
        content_value: newContentValue,
        language: newContentLang,
        updated_by: user?.id
      });

    if (error) {
      if (error.message.includes('duplicate')) {
        toast.error('This text entry already exists for this language');
      } else {
        toast.error('Failed to add. Please try again.');
      }
    } else {
      toast.success('New text added successfully!');
      setNewContentKey('');
      setNewContentValue('');
      fetchContents();
    }
  };

  const handleDeleteContent = async (id: string) => {
    const { error } = await supabase
      .from('site_content')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete. Please try again.');
    } else {
      toast.success('Deleted successfully!');
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

      <main className="container mx-auto px-4 py-8 max-w-5xl">
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
            <div>
              <h2 className="text-lg font-semibold mb-1">Welcome to your Admin Panel!</h2>
              <p className="text-muted-foreground text-sm">
                Here you can easily update the texts and images on your website. 
                Changes you make here will appear on your website immediately after saving.
              </p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Website Texts
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Website Images
            </TabsTrigger>
          </TabsList>

          {/* TEXTS TAB */}
          <TabsContent value="content" className="space-y-6">
            {/* Add New Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Add New Text</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create a new text entry for your website. Give it a clear name so you can find it later.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="contentKey" className="flex items-center gap-2">
                    Name for this text
                    <span className="text-xs text-muted-foreground">(e.g., "About Section Title")</span>
                  </Label>
                  <Input
                    id="contentKey"
                    value={newContentKey}
                    onChange={(e) => setNewContentKey(e.target.value)}
                    placeholder="Enter a descriptive name..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contentLang" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Language
                  </Label>
                  <select
                    id="contentLang"
                    value={newContentLang}
                    onChange={(e) => setNewContentLang(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                  >
                    <option value="en">🇬🇧 English</option>
                    <option value="fr">🇫🇷 French</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="contentValue">The actual text content</Label>
                  <Textarea
                    id="contentValue"
                    value={newContentValue}
                    onChange={(e) => setNewContentValue(e.target.value)}
                    placeholder="Write your text here..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              </div>
              <Button onClick={handleAddContent} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add This Text
              </Button>
            </motion.div>

            {/* Existing Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Your Website Texts</h2>
                  <p className="text-sm text-muted-foreground">Edit any text and click Save to update your website</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchContents}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {contents.length === 0 ? (
                <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No texts added yet</p>
                  <p className="text-sm text-muted-foreground/70">Add your first text using the form above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contents.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-foreground">
                            {getContentLabel(item.content_key)}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {item.language === 'en' ? '🇬🇧 English' : '🇫🇷 French'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveContent(item)}
                            disabled={savingContent === item.id}
                            className="min-w-[100px]"
                          >
                            {savingContent === item.id ? (
                              <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : savedContent === item.id ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Saved!
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </>
                            )}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete this text?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{getContentLabel(item.content_key)}" from your website. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteContent(item.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <Textarea
                        value={item.content_value}
                        onChange={(e) => {
                          setContents(contents.map(c => 
                            c.id === item.id ? { ...c, content_value: e.target.value } : c
                          ));
                        }}
                        className="min-h-[100px] bg-muted/30"
                        placeholder="Enter your text here..."
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* IMAGES TAB */}
          <TabsContent value="images" className="space-y-6">
            {/* Upload New Image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Upload New Image</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Upload images to use on your website. Give each image a clear name and description.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="imageKey" className="flex items-center gap-2">
                    Name for this image
                    <span className="text-xs text-muted-foreground">(required)</span>
                  </Label>
                  <Input
                    id="imageKey"
                    value={newImageKey}
                    onChange={(e) => setNewImageKey(e.target.value)}
                    placeholder="e.g., Coach Photo"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="imageAlt">
                    Description (for accessibility)
                  </Label>
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
            </motion.div>

            {/* Existing Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Your Website Images</h2>
                  <p className="text-sm text-muted-foreground">Manage all images used on your website</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchImages}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {images.length === 0 ? (
                <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
                  <Image className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No images uploaded yet</p>
                  <p className="text-sm text-muted-foreground/70">Upload your first image using the form above</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {images.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={item.image_url}
                          alt={item.alt_text || item.image_key}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-foreground mb-1">
                          {item.image_key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        {item.alt_text && (
                          <p className="text-sm text-muted-foreground mb-3">{item.alt_text}</p>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Image
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this image?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this image from your website. This action cannot be undone.
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
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
