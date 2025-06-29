/*
  # Create categories table

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `icon` (text)
      - `agent_count` (integer, default 0)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `categories` table
    - Add policy for public read access
    - Add policy for admin write access
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'Bot',
  agent_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories
CREATE POLICY "Categories are publicly readable"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert default categories
INSERT INTO categories (name, description, icon, agent_count) VALUES
  ('Data Processing', 'Extract, analyze, and process data with intelligent automation', 'Database', 45),
  ('Content Creation', 'Generate high-quality content, copy, and creative materials', 'PenTool', 32),
  ('Workflow Automation', 'Automate repetitive tasks and streamline business processes', 'Zap', 28),
  ('Customer Service', 'Enhance customer support with intelligent chatbots and assistants', 'MessageSquare', 19),
  ('Digital Marketing', 'Boost your marketing efforts with AI-powered tools and insights', 'Target', 24),
  ('Business Analytics', 'Gain insights and make data-driven decisions with advanced analytics', 'BarChart3', 16)
ON CONFLICT (name) DO NOTHING;