/*
  # Insert sample data

  1. Sample Data
    - Sample profiles for creators
    - Sample agents with realistic data
    - Sample purchases and reviews

  Note: This migration should be run after user accounts are created
*/

-- Insert sample agents (will need real creator_ids from actual users)
-- This is a template - actual data should be inserted after users sign up

-- First, let's create some sample categories if they don't exist
INSERT INTO categories (name, description, icon, agent_count) VALUES
  ('E-commerce', 'AI agents for online stores and retail automation', 'ShoppingCart', 12),
  ('Finance', 'Financial analysis and trading automation agents', 'DollarSign', 8),
  ('Healthcare', 'Medical and health-related AI automation', 'Heart', 6),
  ('Education', 'Learning and educational AI assistants', 'BookOpen', 14),
  ('Real Estate', 'Property management and real estate automation', 'Home', 9)
ON CONFLICT (name) DO NOTHING;

-- Function to create sample agent data (to be called after users exist)
CREATE OR REPLACE FUNCTION create_sample_agents()
RETURNS void AS $$
DECLARE
  data_processing_id uuid;
  content_creation_id uuid;
  automation_id uuid;
  customer_service_id uuid;
  marketing_id uuid;
  analytics_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO data_processing_id FROM categories WHERE name = 'Data Processing';
  SELECT id INTO content_creation_id FROM categories WHERE name = 'Content Creation';
  SELECT id INTO automation_id FROM categories WHERE name = 'Workflow Automation';
  SELECT id INTO customer_service_id FROM categories WHERE name = 'Customer Service';
  SELECT id INTO marketing_id FROM categories WHERE name = 'Digital Marketing';
  SELECT id INTO analytics_id FROM categories WHERE name = 'Business Analytics';

  -- Note: creator_id should be replaced with actual user IDs
  -- This is just a template structure
END;
$$ LANGUAGE plpgsql;

-- Create a function to generate sample data for testing
CREATE OR REPLACE FUNCTION generate_test_data(creator_user_id uuid)
RETURNS void AS $$
DECLARE
  data_processing_id uuid;
  content_creation_id uuid;
  automation_id uuid;
  customer_service_id uuid;
  marketing_id uuid;
  analytics_id uuid;
  agent1_id uuid;
  agent2_id uuid;
  agent3_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO data_processing_id FROM categories WHERE name = 'Data Processing';
  SELECT id INTO content_creation_id FROM categories WHERE name = 'Content Creation';
  SELECT id INTO automation_id FROM categories WHERE name = 'Workflow Automation';
  SELECT id INTO customer_service_id FROM categories WHERE name = 'Customer Service';
  SELECT id INTO marketing_id FROM categories WHERE name = 'Digital Marketing';
  SELECT id INTO analytics_id FROM categories WHERE name = 'Business Analytics';

  -- Insert sample agents
  INSERT INTO agents (
    name, description, price, category_id, image_url, creator_id, 
    rating, sales_count, tags, features, demo_url, documentation_url, status
  ) VALUES
  (
    'DataMiner Pro',
    'Advanced web scraping and data extraction agent with AI-powered insights and automated reporting capabilities.',
    29.99,
    data_processing_id,
    'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    creator_user_id,
    4.9,
    1247,
    ARRAY['Popular', 'AI-Powered', 'Automation'],
    ARRAY['Real-time scraping', 'Data visualization', 'API integration', 'Custom filters'],
    'https://demo.dataminer.com',
    'https://docs.dataminer.com',
    'active'
  ),
  (
    'ContentCraft AI',
    'Generate high-quality content and copy instantly with advanced AI models and customizable templates.',
    19.99,
    content_creation_id,
    'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    creator_user_id,
    4.8,
    892,
    ARRAY['New', 'Content', 'AI'],
    ARRAY['Multiple AI models', 'Custom templates', 'Bulk generation', 'SEO optimization'],
    'https://demo.contentcraft.com',
    'https://docs.contentcraft.com',
    'active'
  ),
  (
    'TaskBot Assistant',
    'Automate repetitive tasks and workflows with intelligent decision making and seamless integrations.',
    15.99,
    automation_id,
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    creator_user_id,
    4.7,
    654,
    ARRAY['Bestseller', 'Productivity'],
    ARRAY['Workflow automation', 'Smart scheduling', 'Team collaboration', 'Custom triggers'],
    'https://demo.taskbot.com',
    'https://docs.taskbot.com',
    'active'
  ),
  (
    'ChatBot Pro',
    'Advanced conversational AI for customer service with natural language processing and multi-language support.',
    39.99,
    customer_service_id,
    'https://images.pexels.com/photos/4792715/pexels-photo-4792715.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    creator_user_id,
    4.9,
    2156,
    ARRAY['Premium', 'AI', 'Customer Service'],
    ARRAY['NLP processing', 'Multi-language', 'Analytics dashboard', 'Custom training'],
    'https://demo.chatbotpro.com',
    'https://docs.chatbotpro.com',
    'active'
  ),
  (
    'EmailCraft',
    'Intelligent email marketing automation with personalization and advanced analytics.',
    24.99,
    marketing_id,
    'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    creator_user_id,
    4.6,
    743,
    ARRAY['Marketing', 'Email', 'Analytics'],
    ARRAY['A/B testing', 'Personalization', 'Campaign analytics', 'Automation workflows'],
    'https://demo.emailcraft.com',
    'https://docs.emailcraft.com',
    'active'
  ),
  (
    'AnalyticsBot',
    'Business intelligence and data analytics agent with real-time reporting and predictive insights.',
    49.99,
    analytics_id,
    'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    creator_user_id,
    4.8,
    1089,
    ARRAY['Enterprise', 'Analytics', 'BI'],
    ARRAY['Real-time dashboards', 'Predictive analytics', 'Custom reports', 'Data visualization'],
    'https://demo.analyticsbot.com',
    'https://docs.analyticsbot.com',
    'active'
  );

END;
$$ LANGUAGE plpgsql;