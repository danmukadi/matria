-- Create simple waitlist_emails table
CREATE TABLE IF NOT EXISTS waitlist_emails (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups and duplicate prevention
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_email ON waitlist_emails(email);

-- Create index on created_at for ordering/analytics
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_created_at ON waitlist_emails(created_at);

-- No RLS needed - simple public access for email collection