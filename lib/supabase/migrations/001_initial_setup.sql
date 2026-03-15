-- FILE PATH: supabase/migrations/001_initial_setup.sql
-- Run this in: supabase.com → your project → SQL Editor
-- This sets up Row Level Security so users only see their own data

-- ─── Enable RLS on all tables ────────────────────────────────────────

ALTER TABLE users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations    ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_wishes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- ─── USERS policies ──────────────────────────────────────────────────

-- Users can read their own profile
CREATE POLICY "users_read_own" ON users
  FOR SELECT USING (auth.uid()::text = "authId");

-- Users can update their own profile
CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid()::text = "authId");

-- Admins can read all users
CREATE POLICY "admin_read_all_users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u."authId" = auth.uid()::text
      AND u.role = 'ADMIN'
    )
  );

-- ─── INVITATIONS policies ─────────────────────────────────────────────

-- Owners and planners can read their invitation
CREATE POLICY "invitation_read_owner" ON invitations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u."authId" = auth.uid()::text
      AND (u.id = "ownerId" OR u.id = "plannerId" OR u.role = 'ADMIN')
    )
  );

-- Public can read ACTIVE invitations by slug (for guests viewing the page)
CREATE POLICY "invitation_read_public_active" ON invitations
  FOR SELECT USING (status = 'ACTIVE');

-- Owners/planners can update their invitation
CREATE POLICY "invitation_update_owner" ON invitations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u."authId" = auth.uid()::text
      AND (u.id = "ownerId" OR u.id = "plannerId" OR u.role = 'ADMIN')
    )
  );

-- Admins can insert invitations
CREATE POLICY "invitation_insert_admin" ON invitations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u."authId" = auth.uid()::text
      AND u.role IN ('ADMIN', 'PLANNER')
    )
  );

-- ─── RSVP RESPONSES policies ──────────────────────────────────────────

-- Anyone can submit an RSVP (public insert)
CREATE POLICY "rsvp_public_insert" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- Invitation owners/planners/admins can read RSVPs
CREATE POLICY "rsvp_read_owner" ON rsvp_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invitations i
      JOIN users u ON (u.id = i."ownerId" OR u.id = i."plannerId")
      WHERE i.id = "invitationId"
      AND (u."authId" = auth.uid()::text OR EXISTS (
        SELECT 1 FROM users admin WHERE admin."authId" = auth.uid()::text AND admin.role = 'ADMIN'
      ))
    )
  );

-- ─── GIFT WISHES policies ─────────────────────────────────────────────

-- Anyone can submit a wish (public insert)
CREATE POLICY "wishes_public_insert" ON gift_wishes
  FOR INSERT WITH CHECK (true);

-- Public can read approved wishes for active invitations
CREATE POLICY "wishes_read_public" ON gift_wishes
  FOR SELECT USING (
    "isApproved" = true
    AND EXISTS (
      SELECT 1 FROM invitations i
      WHERE i.id = "invitationId" AND i.status = 'ACTIVE'
    )
  );

-- Owners can read all wishes (including unapproved)
CREATE POLICY "wishes_read_owner" ON gift_wishes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invitations i
      JOIN users u ON (u.id = i."ownerId" OR u.id = i."plannerId")
      WHERE i.id = "invitationId"
      AND (u."authId" = auth.uid()::text OR EXISTS (
        SELECT 1 FROM users admin WHERE admin."authId" = auth.uid()::text AND admin.role = 'ADMIN'
      ))
    )
  );

-- ─── GALLERY IMAGES policies ──────────────────────────────────────────

-- Public can read gallery images for active invitations
CREATE POLICY "gallery_read_public" ON gallery_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invitations i
      WHERE i.id = "invitationId" AND i.status = 'ACTIVE'
    )
  );

-- Owners can manage their gallery
CREATE POLICY "gallery_manage_owner" ON gallery_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM invitations i
      JOIN users u ON (u.id = i."ownerId" OR u.id = i."plannerId")
      WHERE i.id = "invitationId"
      AND (u."authId" = auth.uid()::text OR EXISTS (
        SELECT 1 FROM users admin WHERE admin."authId" = auth.uid()::text AND admin.role = 'ADMIN'
      ))
    )
  );

-- ─── STORAGE BUCKETS ──────────────────────────────────────────────────
-- Run in SQL editor or create manually in Supabase Dashboard → Storage

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('invitation-images', 'invitation-images', true),
  ('gallery-images',    'gallery-images',    true),
  ('couple-videos',     'couple-videos',     true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies — anyone can read public buckets
CREATE POLICY "public_read_images" ON storage.objects
  FOR SELECT USING (bucket_id IN ('invitation-images', 'gallery-images', 'couple-videos'));

-- Only authenticated owners can upload
CREATE POLICY "auth_upload_images" ON storage.objects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ─── HELPER FUNCTION ──────────────────────────────────────────────────
-- Auto-creates a user record in public.users when someone signs up via Supabase Auth

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users ("authId", email, name, role)
  VALUES (
    NEW.id::text,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::text, 'COUPLE')
  )
  ON CONFLICT ("authId") DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger fires on every new Supabase Auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();