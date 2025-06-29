/*
  # Create reviews table

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `agent_id` (uuid, foreign key)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `reviews` table
    - Add policy for public read access
    - Add policy for users to create reviews for purchased agents
    - Add policy for users to update their own reviews
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure user can only review each agent once
  UNIQUE(user_id, agent_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to reviews
CREATE POLICY "Reviews are publicly readable"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow users to create reviews for agents they've purchased
CREATE POLICY "Users can review purchased agents"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM purchases 
      WHERE purchases.user_id = auth.uid() 
      AND purchases.agent_id = reviews.agent_id 
      AND purchases.status = 'completed'
    )
  );

-- Allow users to update their own reviews
CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);
CREATE INDEX IF NOT EXISTS reviews_agent_id_idx ON reviews(agent_id);
CREATE INDEX IF NOT EXISTS reviews_rating_idx ON reviews(rating);
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews(created_at DESC);

-- Function to update agent rating when reviews change
CREATE OR REPLACE FUNCTION update_agent_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE agents 
  SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 2)
    FROM reviews 
    WHERE agent_id = COALESCE(NEW.agent_id, OLD.agent_id)
  )
  WHERE id = COALESCE(NEW.agent_id, OLD.agent_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update agent rating
DROP TRIGGER IF EXISTS update_rating_trigger ON reviews;
CREATE TRIGGER update_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_agent_rating();