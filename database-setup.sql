-- =====================================================
-- ILLUSION CAFE DATABASE SCHEMA
-- Complete database setup for all features
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- EXISTING TABLES (Already created)
-- =====================================================

-- categories table
-- menu_items table
-- reservations table

-- =====================================================
-- NEW TABLES FOR BLOG CMS
-- =====================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_post_categories (
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, category_id)
);

-- =====================================================
-- NEW TABLES FOR EVENTS MANAGEMENT
-- =====================================================

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  featured_image TEXT,
  max_capacity INTEGER,
  current_attendees INTEGER DEFAULT 0,
  price DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NEW TABLES FOR SETTINGS MANAGEMENT
-- =====================================================

CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value, category, description) VALUES
  ('restaurant_name', 'Illusion Cafe & Sports Lounge', 'general', 'Restaurant name'),
  ('address', '4955 Sugarloaf Pkwy Ste 112, Lawrenceville, GA 30044', 'contact', 'Physical address'),
  ('phone', '(678) 407-8169', 'contact', 'Phone number'),
  ('email', 'Illusionsportslounge@gmail.com', 'contact', 'Email address'),
  ('hours_monday', '11:00 AM - 2:30 AM', 'hours', 'Monday hours'),
  ('hours_tuesday', '11:00 AM - 2:30 AM', 'hours', 'Tuesday hours'),
  ('hours_wednesday', '11:00 AM - 2:30 AM', 'hours', 'Wednesday hours'),
  ('hours_thursday', '11:00 AM - 2:30 AM', 'hours', 'Thursday hours'),
  ('hours_friday', '11:00 AM - 2:30 AM', 'hours', 'Friday hours'),
  ('hours_saturday', '11:00 AM - 2:30 AM', 'hours', 'Saturday hours'),
  ('hours_sunday', '11:00 AM - 2:30 AM', 'hours', 'Sunday hours'),
  ('instagram', '@illusionsportslounge', 'social', 'Instagram handle'),
  ('facebook', '@Illusionsport', 'social', 'Facebook handle'),
  ('twitter', '@illusioncafe', 'social', 'Twitter handle')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- NEW TABLES FOR CONTACT FORM
-- =====================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR BETTER PERFORMANCE
-- =====================================================

-- Blog indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);

-- Contact submissions indexes
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- Menu items indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);

-- Reservations indexes
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for published blog posts
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Public read access for blog categories
CREATE POLICY "Public can view blog categories"
  ON blog_categories FOR SELECT
  USING (true);

-- Public read access for upcoming events
CREATE POLICY "Public can view upcoming events"
  ON events FOR SELECT
  USING (status IN ('upcoming', 'ongoing'));

-- Public read access for settings
CREATE POLICY "Public can view settings"
  ON settings FOR SELECT
  USING (true);

-- Public can insert contact submissions
CREATE POLICY "Public can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Note: Admin access will be handled through service role key in API routes

-- =====================================================
-- FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers to all relevant tables
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STORAGE BUCKETS FOR IMAGES
-- =====================================================

-- Note: These commands need to be run via Supabase dashboard or API
-- Storage buckets:
-- 1. menu-images (for menu item photos)
-- 2. blog-images (for blog post images)
-- 3. event-images (for event photos)

-- =====================================================
-- ANALYTICS VIEWS
-- =====================================================

CREATE OR REPLACE VIEW reservation_analytics AS
SELECT
  DATE(date) as reservation_date,
  COUNT(*) as total_reservations,
  SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_count,
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_count,
  SUM(guests) as total_guests,
  AVG(guests) as avg_party_size
FROM reservations
GROUP BY DATE(date)
ORDER BY DATE(date) DESC;

CREATE OR REPLACE VIEW menu_analytics AS
SELECT
  c.name as category_name,
  COUNT(mi.id) as item_count,
  AVG(mi.price) as avg_price,
  SUM(CASE WHEN mi.is_available THEN 1 ELSE 0 END) as available_count
FROM categories c
LEFT JOIN menu_items mi ON c.id = mi.category_id
GROUP BY c.id, c.name;

-- =====================================================
-- SETUP COMPLETE
-- =====================================================
