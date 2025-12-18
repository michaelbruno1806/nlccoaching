-- Add unique constraint on content_key and language for upsert support
ALTER TABLE public.site_content 
ADD CONSTRAINT site_content_key_language_unique UNIQUE (content_key, language);