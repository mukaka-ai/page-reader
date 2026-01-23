-- ============================================
-- 1. CREATE ROLE ENUM AND USER_ROLES TABLE
-- ============================================

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table (roles stored separately for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. CREATE SECURITY DEFINER FUNCTION FOR ROLE CHECK
-- ============================================

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

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- ============================================
-- 3. CREATE PROFILES TABLE
-- ============================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE COACHES TABLE
-- ============================================

CREATE TABLE public.coaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    rank TEXT NOT NULL,
    experience TEXT,
    specialization TEXT[],
    achievements TEXT[],
    students TEXT[],
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. CREATE EVENTS TABLE
-- ============================================

CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    type TEXT NOT NULL CHECK (type IN ('competition', 'seminar', 'workshop', 'exam')),
    registration_link TEXT,
    image_url TEXT,
    is_past BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. CREATE STUDENTS TABLE (Registration)
-- ============================================

CREATE TABLE public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    age INTEGER NOT NULL,
    class TEXT NOT NULL CHECK (class IN ('kids', 'adults', 'private')),
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. CREATE MESSAGES TABLE (Contact Form)
-- ============================================

CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 8. RLS POLICIES FOR USER_ROLES
-- ============================================

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Only admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin());

-- ============================================
-- 9. RLS POLICIES FOR PROFILES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin());

-- ============================================
-- 10. RLS POLICIES FOR COACHES
-- ============================================

-- Public read access for coaches
CREATE POLICY "Anyone can view coaches"
ON public.coaches
FOR SELECT
TO anon, authenticated
USING (true);

-- Admin-only create
CREATE POLICY "Admins can create coaches"
ON public.coaches
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Admin-only update
CREATE POLICY "Admins can update coaches"
ON public.coaches
FOR UPDATE
TO authenticated
USING (public.is_admin());

-- Admin-only delete
CREATE POLICY "Admins can delete coaches"
ON public.coaches
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================
-- 11. RLS POLICIES FOR EVENTS
-- ============================================

-- Public read access for events
CREATE POLICY "Anyone can view events"
ON public.events
FOR SELECT
TO anon, authenticated
USING (true);

-- Admin-only create
CREATE POLICY "Admins can create events"
ON public.events
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Admin-only update
CREATE POLICY "Admins can update events"
ON public.events
FOR UPDATE
TO authenticated
USING (public.is_admin());

-- Admin-only delete
CREATE POLICY "Admins can delete events"
ON public.events
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================
-- 12. RLS POLICIES FOR STUDENTS
-- ============================================

-- Anyone can register (insert) as a student
CREATE POLICY "Anyone can register as student"
ON public.students
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin-only read access
CREATE POLICY "Admins can view students"
ON public.students
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admin-only update
CREATE POLICY "Admins can update students"
ON public.students
FOR UPDATE
TO authenticated
USING (public.is_admin());

-- Admin-only delete
CREATE POLICY "Admins can delete students"
ON public.students
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================
-- 13. RLS POLICIES FOR MESSAGES
-- ============================================

-- Anyone can submit a message
CREATE POLICY "Anyone can submit messages"
ON public.messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin-only read access
CREATE POLICY "Admins can view messages"
ON public.messages
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admin-only update (mark as read)
CREATE POLICY "Admins can update messages"
ON public.messages
FOR UPDATE
TO authenticated
USING (public.is_admin());

-- Admin-only delete
CREATE POLICY "Admins can delete messages"
ON public.messages
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================
-- 14. TRIGGER FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coaches_updated_at
BEFORE UPDATE ON public.coaches
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 15. AUTO-CREATE PROFILE AND DEFAULT ROLE ON SIGNUP
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    
    -- Assign default 'user' role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 16. STORAGE BUCKETS
-- ============================================

-- Create coaches bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('coaches', 'coaches', true);

-- Create events bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('events', 'events', true);

-- ============================================
-- 17. STORAGE POLICIES FOR COACHES BUCKET
-- ============================================

-- Anyone can view coach images
CREATE POLICY "Public read access for coaches bucket"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'coaches');

-- Only admins can upload coach images
CREATE POLICY "Admins can upload coach images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'coaches' AND public.is_admin());

-- Only admins can update coach images
CREATE POLICY "Admins can update coach images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'coaches' AND public.is_admin());

-- Only admins can delete coach images
CREATE POLICY "Admins can delete coach images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'coaches' AND public.is_admin());

-- ============================================
-- 18. STORAGE POLICIES FOR EVENTS BUCKET
-- ============================================

-- Anyone can view event images
CREATE POLICY "Public read access for events bucket"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'events');

-- Only admins can upload event images
CREATE POLICY "Admins can upload event images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'events' AND public.is_admin());

-- Only admins can update event images
CREATE POLICY "Admins can update event images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'events' AND public.is_admin());

-- Only admins can delete event images
CREATE POLICY "Admins can delete event images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'events' AND public.is_admin());