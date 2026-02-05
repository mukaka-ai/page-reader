-- Create gallery_videos table for video management
CREATE TABLE public.gallery_videos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'training',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for video access
CREATE POLICY "Anyone can view gallery videos" 
ON public.gallery_videos 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can create gallery videos" 
ON public.gallery_videos 
FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Admins can update gallery videos" 
ON public.gallery_videos 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Admins can delete gallery videos" 
ON public.gallery_videos 
FOR DELETE 
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gallery_videos_updated_at
BEFORE UPDATE ON public.gallery_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();