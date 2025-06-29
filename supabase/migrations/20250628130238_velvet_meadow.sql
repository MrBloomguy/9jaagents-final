/*
  # Create purchases table

  1. New Tables
    - `purchases`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `agent_id` (uuid, foreign key)
      - `amount` (decimal)
      - `status` (enum: completed, pending, failed)
      - `stripe_payment_id` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `purchases` table
    - Add policy for users to read their own purchases
    - Add policy for creators to see purchases of their agents
*/

-- Create purchase status enum
DO $$ BEGIN
  CREATE TYPE purchase_status AS ENUM ('completed', 'pending', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10,2) NOT NULL,
  status purchase_status DEFAULT 'pending',
  stripe_payment_id text,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure user can't purchase same agent twice
  UNIQUE(user_id, agent_id)
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own purchases
CREATE POLICY "Users can read own purchases"
  ON purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own purchases
CREATE POLICY "Users can insert own purchases"
  ON purchases
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow creators to see purchases of their agents
CREATE POLICY "Creators can see agent purchases"
  ON purchases
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agents 
      WHERE agents.id = purchases.agent_id 
      AND agents.creator_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS purchases_user_id_idx ON purchases(user_id);
CREATE INDEX IF NOT EXISTS purchases_agent_id_idx ON purchases(agent_id);
CREATE INDEX IF NOT EXISTS purchases_status_idx ON purchases(status);
CREATE INDEX IF NOT EXISTS purchases_created_at_idx ON purchases(created_at DESC);

-- Function to update sales count when purchase is completed
CREATE OR REPLACE FUNCTION update_agent_sales_count()
RETURNS trigger AS $$
BEGIN
  -- Only update if status changed to completed
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE agents 
    SET sales_count = sales_count + 1
    WHERE id = NEW.agent_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update sales count
DROP TRIGGER IF EXISTS update_sales_count_trigger ON purchases;
CREATE TRIGGER update_sales_count_trigger
  AFTER INSERT OR UPDATE ON purchases
  FOR EACH ROW EXECUTE FUNCTION update_agent_sales_count();