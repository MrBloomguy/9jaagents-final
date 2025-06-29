/*
  # Create agents table

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `category_id` (uuid, foreign key)
      - `image_url` (text)
      - `creator_id` (uuid, foreign key)
      - `rating` (decimal, default 0)
      - `sales_count` (integer, default 0)
      - `tags` (text array)
      - `features` (text array)
      - `demo_url` (text, optional)
      - `documentation_url` (text, optional)
      - `status` (enum: active, pending, rejected)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `agents` table
    - Add policies for public read access to active agents
    - Add policies for creators to manage their own agents
*/

-- Create status enum
DO $$ BEGIN
  CREATE TYPE agent_status AS ENUM ('active', 'pending', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  creator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating decimal(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  sales_count integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  demo_url text,
  documentation_url text,
  status agent_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active agents
CREATE POLICY "Active agents are publicly readable"
  ON agents
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- Allow creators to read their own agents
CREATE POLICY "Creators can read own agents"
  ON agents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = creator_id);

-- Allow creators to insert their own agents
CREATE POLICY "Creators can insert own agents"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

-- Allow creators to update their own agents
CREATE POLICY "Creators can update own agents"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS agents_category_id_idx ON agents(category_id);
CREATE INDEX IF NOT EXISTS agents_creator_id_idx ON agents(creator_id);
CREATE INDEX IF NOT EXISTS agents_status_idx ON agents(status);
CREATE INDEX IF NOT EXISTS agents_rating_idx ON agents(rating DESC);
CREATE INDEX IF NOT EXISTS agents_sales_count_idx ON agents(sales_count DESC);
CREATE INDEX IF NOT EXISTS agents_created_at_idx ON agents(created_at DESC);

-- Function to update agent count in categories
CREATE OR REPLACE FUNCTION update_category_agent_count()
RETURNS trigger AS $$
BEGIN
  -- Update count for old category (if exists)
  IF OLD.category_id IS NOT NULL THEN
    UPDATE categories 
    SET agent_count = (
      SELECT COUNT(*) 
      FROM agents 
      WHERE category_id = OLD.category_id AND status = 'active'
    )
    WHERE id = OLD.category_id;
  END IF;
  
  -- Update count for new category (if exists)
  IF NEW.category_id IS NOT NULL THEN
    UPDATE categories 
    SET agent_count = (
      SELECT COUNT(*) 
      FROM agents 
      WHERE category_id = NEW.category_id AND status = 'active'
    )
    WHERE id = NEW.category_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update category counts
DROP TRIGGER IF EXISTS update_category_count_trigger ON agents;
CREATE TRIGGER update_category_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_category_agent_count();