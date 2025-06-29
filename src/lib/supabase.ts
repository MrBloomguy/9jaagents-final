import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a fallback client even if env vars are missing
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing. Using fallback configuration.');
    console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
    console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
    
    // Return a mock client that won't cause errors
    return createClient(
      'https://placeholder.supabase.co', 
      'placeholder-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      }
    );
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          bio?: string;
          website?: string;
          location?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          bio?: string;
          website?: string;
          location?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string;
          bio?: string;
          website?: string;
          location?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          agent_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon?: string;
          agent_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string;
          agent_count?: number;
          created_at?: string;
        };
      };
      agents: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category_id?: string;
          image_url: string;
          creator_id: string;
          rating: number;
          sales_count: number;
          tags: string[];
          features: string[];
          demo_url?: string;
          documentation_url?: string;
          status: 'active' | 'pending' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          category_id?: string;
          image_url: string;
          creator_id: string;
          rating?: number;
          sales_count?: number;
          tags?: string[];
          features?: string[];
          demo_url?: string;
          documentation_url?: string;
          status?: 'active' | 'pending' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          category_id?: string;
          image_url?: string;
          creator_id?: string;
          rating?: number;
          sales_count?: number;
          tags?: string[];
          features?: string[];
          demo_url?: string;
          documentation_url?: string;
          status?: 'active' | 'pending' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
      };
      purchases: {
        Row: {
          id: string;
          user_id: string;
          agent_id: string;
          amount: number;
          status: 'completed' | 'pending' | 'failed';
          stripe_payment_id?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          agent_id: string;
          amount: number;
          status?: 'completed' | 'pending' | 'failed';
          stripe_payment_id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          agent_id?: string;
          amount?: number;
          status?: 'completed' | 'pending' | 'failed';
          stripe_payment_id?: string;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          agent_id: string;
          rating: number;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          agent_id: string;
          rating: number;
          comment: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          agent_id?: string;
          rating?: number;
          comment?: string;
          created_at?: string;
        };
      };
    };
  };
};