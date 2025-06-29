import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

export function useAgents(filters?: {
  search?: string;
  category?: string;
  priceRange?: [number, number];
  sortBy?: string;
}) {
  const [agents, setAgents] = useState<Tables['agents']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
  }, [filters]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        console.warn('Supabase not configured, using mock data');
        setAgents([]);
        setLoading(false);
        return;
      }

      let query = supabase
        .from('agents')
        .select(`
          *,
          profiles:creator_id (
            full_name,
            avatar_url
          ),
          categories:category_id (
            name
          )
        `)
        .eq('status', 'active');

      // Apply filters
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.category && filters.category !== 'all') {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', filters.category)
          .single();
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      if (filters?.priceRange) {
        query = query
          .gte('price', filters.priceRange[0])
          .lte('price', filters.priceRange[1]);
      }

      // Apply sorting
      switch (filters?.sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'popular':
        default:
          query = query.order('sales_count', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) throw error;
      setAgents(data || []);
    } catch (err) {
      console.error('Error fetching agents:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAgents([]); // Set empty array on error to allow fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  return { agents, loading, error, refetch: fetchAgents };
}

export function useCategories() {
  const [categories, setCategories] = useState<Tables['categories']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        console.warn('Supabase not configured, using mock data');
        setCategories([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
}

export function useAgent(id: string) {
  const [agent, setAgent] = useState<Tables['agents']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchAgent(id);
    }
  }, [id]);

  const fetchAgent = async (agentId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        console.warn('Supabase not configured, using mock data');
        setAgent(null);
        setLoading(false);
        return;
      }
      
      // Check if ID is a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(agentId)) {
        // For non-UUID IDs, return null to use mock data
        setAgent(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('agents')
        .select(`
          *,
          profiles:creator_id (
            full_name,
            avatar_url,
            bio
          ),
          categories:category_id (
            name
          )
        `)
        .eq('id', agentId)
        .single();

      if (error) throw error;
      setAgent(data);
    } catch (err) {
      console.error('Error fetching agent:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAgent(null);
    } finally {
      setLoading(false);
    }
  };

  return { agent, loading, error, refetch: () => fetchAgent(id) };
}

export function useUserAgents(userId?: string) {
  const [agents, setAgents] = useState<Tables['agents']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserAgents(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchUserAgents = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        console.warn('Supabase not configured, using mock data');
        setAgents([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('agents')
        .select(`
          *,
          categories:category_id (
            name
          )
        `)
        .eq('creator_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (err) {
      console.error('Error fetching user agents:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  return { agents, loading, error, refetch: () => userId && fetchUserAgents(userId) };
}

export function useUserPurchases() {
  const [purchases, setPurchases] = useState<Tables['purchases']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        console.warn('Supabase not configured, using mock data');
        setPurchases([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          agents (
            name,
            image_url,
            price
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (err) {
      console.error('Error fetching purchases:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  return { purchases, loading, error, refetch: fetchPurchases };
}

export function useAgentReviews(agentId: string) {
  const [reviews, setReviews] = useState<Tables['reviews']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (agentId) {
      fetchReviews(agentId);
    }
  }, [agentId]);

  const fetchReviews = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        console.warn('Supabase not configured, using mock data');
        setReviews([]);
        setLoading(false);
        return;
      }
      
      // Check if ID is a valid UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        // For non-UUID IDs, return empty array to use mock data
        setReviews([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('agent_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  return { reviews, loading, error, refetch: () => fetchReviews(agentId) };
}

export function useCreateAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAgent = async (agentData: Tables['agents']['Insert']) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('agents')
        .insert([agentData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createAgent, loading, error };
}

export function usePurchaseAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchaseAgent = async (agentId: string, amount: number, paymentReference?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('purchases')
        .insert([{
          agent_id: agentId,
          amount,
          status: 'completed', // In real app, this would be 'pending' until payment confirms
          stripe_payment_id: paymentReference
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { purchaseAgent, loading, error };
}

export function useCreateReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReview = async (reviewData: Tables['reviews']['Insert']) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createReview, loading, error };
}

export function useMarketplaceStats() {
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalCategories: 0,
    avgRating: 0,
    totalSales: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        console.warn('Supabase not configured, using mock data');
        setStats({
          totalAgents: 0,
          totalCategories: 0,
          avgRating: 0,
          totalSales: 0
        });
        setLoading(false);
        return;
      }
      
      // Get total agents
      const { count: agentCount } = await supabase
        .from('agents')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Get total categories
      const { count: categoryCount } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      // Get average rating and total sales
      const { data: agentData } = await supabase
        .from('agents')
        .select('rating, sales_count')
        .eq('status', 'active');

      const avgRating = agentData?.length 
        ? agentData.reduce((sum, agent) => sum + (agent.rating || 0), 0) / agentData.length 
        : 0;

      const totalSales = agentData?.reduce((sum, agent) => sum + (agent.sales_count || 0), 0) || 0;

      setStats({
        totalAgents: agentCount || 0,
        totalCategories: categoryCount || 0,
        avgRating: Math.round(avgRating * 10) / 10,
        totalSales
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStats({
        totalAgents: 0,
        totalCategories: 0,
        avgRating: 0,
        totalSales: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch: fetchStats };
}