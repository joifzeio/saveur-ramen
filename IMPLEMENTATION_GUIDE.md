# Illusion Cafe - Implementation Guide

This guide outlines what has been completed and what remains to be implemented.

## ✅ COMPLETED FEATURES

### 1. Email Notification System
- **File**: `lib/email.ts`
- **Features**:
  - Reservation confirmation emails to customers
  - Admin notification emails for new reservations
  - Status update emails (confirmed, cancelled, completed)
- **Setup Required**:
  1. Sign up at https://resend.com/
  2. Get API key from https://resend.com/api-keys
  3. Add to `.env.local`: `RESEND_API_KEY=your_key_here`
  4. Update sender email in `lib/email.ts` (currently uses `onboarding@resend.dev`)

### 2. Backend API Routes with Validation
- **File**: `app/api/reservations/route.ts`
- **Features**:
  - POST endpoint for creating reservations
  - GET endpoint for fetching reservations
  - Email format validation
  - Phone number validation
  - Date/time validation (prevents past dates)
  - Duplicate reservation detection (within 30 minutes)
  - Sends emails automatically

### 3. Security Improvements
- **File**: `scripts/create-admin.js`
- **Changes**:
  - Removed hardcoded credentials
  - Now prompts for email/password interactively
  - Loads credentials from `.env.local`
- **Usage**: `node scripts/create-admin.js`

### 4. Error Pages
- **404 Page**: `app/not-found.tsx`
- **500 Page**: `app/error.tsx`
- **Features**: Styled error pages with navigation and helpful actions

### 5. Database Schema
- **File**: `database-setup.sql`
- **Includes schemas for**:
  - Blog posts and categories
  - Events management
  - Settings (dynamic configuration)
  - Contact form submissions
  - Indexes for performance
  - Row Level Security policies
  - Analytics views

---

## 🚧 REMAINING FEATURES TO IMPLEMENT

### 6. Image Upload System (Supabase Storage)

#### Setup Supabase Storage Buckets:
1. Go to Supabase Dashboard → Storage
2. Create three buckets:
   - `menu-images` (public)
   - `blog-images` (public)
   - `event-images` (public)
3. Set bucket policies to public read

#### Create Upload Utility (`lib/upload.ts`):
```typescript
import { supabase } from './supabase';

export async function uploadImage(
  file: File,
  bucket: 'menu-images' | 'blog-images' | 'event-images',
  folder?: string
): Promise<{ url: string | null; error: any }> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    return { url: null, error };
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return { url: publicUrl, error: null };
}
```

#### Update Admin Dashboard to include image upload:
Add file input and upload functionality to menu item form.

---

### 7. Blog CMS System

#### A. Run Database Migrations
Execute `database-setup.sql` in Supabase SQL Editor.

#### B. Create Blog API Routes (`app/api/blog/route.ts`):
```typescript
// GET /api/blog - List all blog posts
// POST /api/blog - Create new blog post
// PUT /api/blog/[id] - Update blog post
// DELETE /api/blog/[id] - Delete blog post
```

#### C. Create Blog Admin Page (`app/admin-x7k9p2/blog/page.tsx`):
- List all blog posts (draft, published, archived)
- Create/Edit/Delete functionality
- Rich text editor (use `react-quill` or `@tiptap/react`)
- Image upload for featured images
- Category management
- Slug generation

#### D. Update Blog Pages to use database:
- Update `app/blog/page.tsx` to fetch from API
- Update `app/blog/[slug]/page.tsx` to fetch from API

---

### 8. Events Management System

#### A. Create Events API Routes (`app/api/events/route.ts`):
```typescript
// GET /api/events - List events
// POST /api/events - Create event
// PUT /api/events/[id] - Update event
// DELETE /api/events/[id] - Delete event
```

#### B. Create Events Admin Page (`app/admin-x7k9p2/events/page.tsx`):
- List all events
- Create/Edit/Delete functionality
- Date/time picker
- Capacity management
- Image upload

#### C. Update Events Page (`app/events/page.tsx`):
- Fetch events from database
- Display upcoming events
- Event details page
- Registration functionality (optional)

---

### 9. Settings Management

#### A. Create Settings API Routes (`app/api/settings/route.ts`):
```typescript
// GET /api/settings - Get all settings
// PUT /api/settings - Update settings
```

#### B. Create Settings Admin Page (`app/admin-x7k9p2/settings/page.tsx`):
- Edit restaurant name
- Edit contact information (address, phone, email)
- Edit opening hours
- Edit social media links
- Save/Update functionality

#### C. Update Pages to use dynamic settings:
- Update `app/contact/page.tsx`
- Update `app/about/page.tsx`
- Update footer components

---

### 10. Contact Form with Email Integration

#### A. Create Contact API Route (`app/api/contact/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, subject, message } = body;

  // Validation
  // Save to database
  // Send email to admin
  // Send confirmation to user

  return NextResponse.json({ success: true });
}
```

#### B. Update Contact Page (`app/contact/page.tsx`):
Add form with fields:
- Name
- Email
- Phone (optional)
- Subject
- Message
- Submit button

---

### 11. Password Reset Flow

#### A. Create Password Reset Page (`app/admin-x7k9p2/forgot-password/page.tsx`):
```typescript
// Form to enter email
// Submit calls Supabase resetPasswordForEmail
```

#### B. Update Login Page:
Add "Forgot Password?" link

#### C. Create Reset Password Page (`app/admin-x7k9p2/reset-password/page.tsx`):
```typescript
// Form to enter new password
// Validates token from URL
// Updates password using Supabase
```

---

### 12. Sports Schedule API Integration

#### Options:
1. **SportsData.io** - Comprehensive sports data
2. **The Sports DB** - Free API with basic data
3. **API-Sports** - Multiple sports coverage

#### Implementation (`app/schedule/page.tsx`):
```typescript
// Fetch games from API
// Display by date/time
// Filter by sport
// Update automatically
```

---

### 13. Analytics Dashboard

#### Create Analytics Admin Page (`app/admin-x7k9p2/analytics/page.tsx`):

**Reservation Analytics**:
- Total reservations by date
- Peak hours chart
- Status breakdown (confirmed, pending, cancelled)
- Average party size
- Monthly trends

**Menu Analytics**:
- Most viewed items (requires tracking)
- Items by category
- Average prices
- Popular items

**Contact Form Analytics**:
- Submissions over time
- Response rate
- Common subjects

**Use Charts**: Install `recharts` for visualizations
```bash
npm install recharts
```

---

### 14. Bulk Operations in Admin Dashboard

#### Update Admin Dashboard (`app/admin-x7k9p2/dashboard/page.tsx`):

**Add Features**:
1. **Bulk Delete**:
   - Checkboxes for each item
   - "Delete Selected" button
   - Confirmation modal

2. **Bulk Price Update**:
   - Select multiple items
   - Apply percentage increase/decrease
   - Preview changes before saving

3. **Import/Export**:
   - Export menu to CSV/JSON
   - Import from CSV/JSON
   - Validation on import

4. **Duplicate Multiple Items**:
   - Select items to duplicate
   - Bulk duplicate with suffix

---

## 📦 ADDITIONAL PACKAGES TO INSTALL

```bash
# Rich text editor for blog
npm install react-quill @types/react-quill

# Or use TipTap (recommended)
npm install @tiptap/react @tiptap/starter-kit @tiptap/pm

# Charts for analytics
npm install recharts

# Date picker
npm install react-datepicker @types/react-datepicker

# CSV parsing for import/export
npm install papaparse @types/papaparse
```

---

## 🗄️ DATABASE SETUP INSTRUCTIONS

1. Go to Supabase Dashboard → SQL Editor
2. Copy the contents of `database-setup.sql`
3. Paste and run the script
4. Verify tables are created in Database → Tables
5. Check Storage for bucket creation (manual step)
6. Verify RLS policies in Database → Policies

---

## 🔐 ENVIRONMENT VARIABLES CHECKLIST

Make sure `.env.local` contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
RESEND_API_KEY=your_resend_key  # Add this!
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying to production:

1. ✅ Run database setup script in production database
2. ✅ Update email sender domain in Resend
3. ✅ Set all environment variables in hosting platform
4. ✅ Test all email notifications
5. ✅ Test image uploads
6. ✅ Update social media links
7. ✅ Test reservation flow end-to-end
8. ✅ Test admin authentication
9. ✅ Set up domain for Resend emails
10. ✅ Enable RLS policies
11. ✅ Test error pages
12. ✅ Set up monitoring/logging

---

## 📝 PRIORITY ORDER FOR IMPLEMENTATION

Based on business value:

1. **HIGH PRIORITY**:
   - Image upload system (for menu)
   - Contact form (customer communication)
   - Settings management (easy content updates)

2. **MEDIUM PRIORITY**:
   - Blog CMS (content marketing)
   - Events management (event promotion)
   - Password reset (admin convenience)

3. **NICE TO HAVE**:
   - Sports API integration (if live scores needed)
   - Analytics dashboard (business insights)
   - Bulk operations (admin efficiency)

---

## 🐛 KNOWN ISSUES TO ADDRESS

1. **Security**:
   - Add rate limiting to API routes
   - Implement CSRF protection
   - Add request signing for admin operations

2. **Performance**:
   - Add caching for menu items
   - Implement image optimization
   - Add loading skeletons

3. **UX**:
   - Add loading states everywhere
   - Implement optimistic updates
   - Add success/error toasts consistently

---

## 📞 SUPPORT

For issues or questions:
1. Check this guide first
2. Review Next.js 16 documentation
3. Check Supabase documentation
4. Review Resend documentation

---

## 📄 LICENSE

Internal use only - Illusion Cafe & Sports Lounge
