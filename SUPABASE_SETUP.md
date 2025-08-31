# Supabase Setup Instructions

## 1. Get Your Supabase Credentials

From your Supabase dashboard:

1. Go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon/public key** 
4. Copy your **service_role key** (for admin operations)

## 2. Update Environment Variables

Replace the placeholder values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

## 3. Create Database Table

In your Supabase dashboard:

1. Go to **SQL Editor**
2. Run the SQL script from `supabase-setup.sql`

Or copy and paste this SQL:

```sql
-- Create simple waitlist_emails table
CREATE TABLE IF NOT EXISTS waitlist_emails (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_email ON waitlist_emails(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_created_at ON waitlist_emails(created_at);
```

## 4. Test the Setup

Restart your Next.js development server:
```bash
npm run dev
```

Try signing up with an email - it should now be stored in your Supabase database!

## 5. View Collected Emails

In Supabase dashboard:
1. Go to **Table Editor**
2. Select the **waitlist_emails** table
3. View all collected emails with timestamps

## Features Implemented

- ✅ Email validation (client & server)
- ✅ Duplicate email prevention
- ✅ Error handling
- ✅ Success confirmations
- ✅ Database storage with timestamps
- ✅ Row Level Security enabled