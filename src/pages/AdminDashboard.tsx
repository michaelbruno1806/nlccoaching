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
import { LogOut, Save, Upload, Image, Type, RefreshCw } from 'lucide-react';

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
  const [savingContent, setSavingContent] = useState(false);

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
    setSavingContent(true);
    const { error } = await supabase
      .from('site_content')
      .update({ content_value: item.content_value, updated_by: user?.id })
      .eq('id', item.id);

    if (error) {
      toast.error('Failed to save content');
    } else {
      toast.success('Content saved');
    }
    setSavingContent(false);
  };

  const handleAddContent = async () => {
    if (!newContentKey || !newContentValue) {
      toast.error('Please fill in all fields');
      return;
    }

    const { error } = await supabase
      .from('site_content')
      .insert({
        content_key: newContentKey,
        content_value: newContentValue,
        language: newContentLang,
        updated_by: user?.id
      });

    if (error) {
      if (error.message.includes('duplicate')) {
        toast.error('This content key already exists for this language');
      } else {
        toast.error('Failed to add content');
      }
    } else {
      toast.success('Content added');
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
      toast.error('Failed to delete content');
    } else {
      toast.success('Content deleted');
      fetchContents();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !newImageKey) {
      toast.error('Please enter an image key first');
      return;
    }

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${newImageKey}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error('Failed to upload image');
      setUploadingImage(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('site-images')
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase
      .from('site_images')
      .upsert({
        image_key: newImageKey,
        image_url: urlData.publicUrl,
        alt_text: newImageAlt,
        updated_by: user?.id
      }, { onConflict: 'image_key' });

    if (insertError) {
      toast.error('Failed to save image record');
    } else {
      toast.success('Image uploaded');
      setNewImageKey('');
      setNewImageAlt('');
      fetchImages();
    }
    setUploadingImage(false);
  };

  const handleDeleteImage = async (item: ImageItem) => {
    // Delete from storage
    const fileName = item.image_url.split('/').pop();
    if (fileName) {
      await supabase.storage.from('site-images').remove([fileName]);
    }

    // Delete from database
    const { error } = await supabase
      .from('site_images')
      .delete()
      .eq('id', item.id);

    if (error) {
      toast.error('Failed to delete image');
    } else {
      toast.success('Image deleted');
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
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Texts
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Add New Content</h2>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <Label htmlFor="contentKey">Content Key</Label>
                  <Input
                    id="contentKey"
                    value={newContentKey}
                    onChange={(e) => setNewContentKey(e.target.value)}
                    placeholder="hero_title"
                  />
                </div>
                <div>
                  <Label htmlFor="contentLang">Language</Label>
                  <select
                    id="contentLang"
                    value={newContentLang}
                    onChange={(e) => setNewContentLang(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="contentValue">Value</Label>
                  <Input
                    id="contentValue"
                    value={newContentValue}
                    onChange={(e) => setNewContentValue(e.target.value)}
                    placeholder="Your content here"
                  />
                </div>
              </div>
              <Button onClick={handleAddContent} className="mt-4">
                Add Content
              </Button>
            </motion.div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Existing Content</h2>
                <Button variant="outline" size="sm" onClick={fetchContents}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
              {contents.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No content added yet</p>
              ) : (
                contents.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card border border-border rounded-xl p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                            {item.content_key}
                          </span>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            {item.language.toUpperCase()}
                          </span>
                        </div>
                        <Textarea
                          value={item.content_value}
                          onChange={(e) => {
                            setContents(contents.map(c => 
                              c.id === item.id ? { ...c, content_value: e.target.value } : c
                            ));
                          }}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveContent(item)}
                          disabled={savingContent}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteContent(item.id)}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Upload New Image</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="imageKey">Image Key</Label>
                  <Input
                    id="imageKey"
                    value={newImageKey}
                    onChange={(e) => setNewImageKey(e.target.value)}
                    placeholder="hero_background"
                  />
                </div>
                <div>
                  <Label htmlFor="imageAlt">Alt Text</Label>
                  <Input
                    id="imageAlt"
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                    placeholder="Description of image"
                  />
                </div>
                <div>
                  <Label htmlFor="imageFile">Image File</Label>
                  <div className="relative">
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={!newImageKey || uploadingImage}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              {uploadingImage && (
                <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
              )}
            </motion.div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Uploaded Images</h2>
                <Button variant="outline" size="sm" onClick={fetchImages}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
              {images.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No images uploaded yet</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {images.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      <div className="aspect-video bg-muted">
                        <img
                          src={item.image_url}
                          alt={item.alt_text || item.image_key}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-mono text-sm bg-muted px-2 py-1 rounded inline-block mb-2">
                          {item.image_key}
                        </p>
                        {item.alt_text && (
                          <p className="text-sm text-muted-foreground">{item.alt_text}</p>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          className="mt-2"
                          onClick={() => handleDeleteImage(item)}
                        >
                          Delete
                        </Button>
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
