-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_content table for editable texts
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_key TEXT NOT NULL,
    content_value TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id),
    UNIQUE (content_key, language)
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read content
CREATE POLICY "Anyone can read site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can modify content
CREATE POLICY "Admins can manage site content"
ON public.site_content
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_images table for editable images
CREATE TABLE public.site_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_key TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on site_images
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Everyone can read images
CREATE POLICY "Anyone can read site images"
ON public.site_images
FOR SELECT
USING (true);

-- Only admins can modify images
CREATE POLICY "Admins can manage site images"
ON public.site_images
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_images_updated_at
BEFORE UPDATE ON public.site_images
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage policies
CREATE POLICY "Anyone can view site images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Admins can upload site images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));