import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export interface PaymentData {
  agent_id: string;
  amount: number;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  payment_method: 'paystack';
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPurchase = async (paymentData: PaymentData) => {
    try {
      setLoading(true);
      setError(null);

      // For testing purposes, we'll simulate payment verification
      // In production, this should be done on the backend
      const isTestMode = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.includes('test') || 
                         import.meta.env.VITE_PAYSTACK_SECRET_KEY?.includes('test');

      if (isTestMode) {
        // Simulate successful test payment
        console.log('Test payment simulation:', paymentData);
        
        // Create purchase record in database
        const { data, error: dbError } = await supabase
          .from('purchases')
          .insert([{
            agent_id: paymentData.agent_id,
            amount: paymentData.amount,
            status: 'completed',
            stripe_payment_id: paymentData.reference // Using this field for Paystack reference
          }])
          .select()
          .single();

        if (dbError) throw dbError;

        toast.success('Test purchase completed successfully!');
        return data;
      } else {
        // Real payment verification
        try {
          const verificationResponse = await fetch(
            `https://api.paystack.co/transaction/verify/${paymentData.reference}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
              },
            }
          );

          const verification = await verificationResponse.json();

          if (!verification.status || verification.data.status !== 'success') {
            throw new Error('Payment verification failed');
          }

          // Create purchase record in database
          const { data, error: dbError } = await supabase
            .from('purchases')
            .insert([{
              agent_id: paymentData.agent_id,
              amount: paymentData.amount,
              status: 'completed',
              stripe_payment_id: paymentData.reference
            }])
            .select()
            .single();

          if (dbError) throw dbError;

          toast.success('Purchase completed successfully!');
          return data;
        } catch (verificationError) {
          console.error('Payment verification error:', verificationError);
          throw new Error('Payment verification failed. Please contact support if payment was deducted.');
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getUserPurchases = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await supabase
        .from('purchases')
        .select(`
          *,
          agents (
            id,
            name,
            image_url,
            price,
            description
          )
        `)
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;
      return data || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch purchases';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const checkPurchaseStatus = async (agentId: string) => {
    try {
      const { data, error: dbError } = await supabase
        .from('purchases')
        .select('id, status')
        .eq('agent_id', agentId)
        .eq('status', 'completed')
        .single();

      if (dbError && dbError.code !== 'PGRST116') throw dbError;
      return !!data;
    } catch (err) {
      console.error('Error checking purchase status:', err);
      return false;
    }
  };

  const simulateTestPurchase = async (agentId: string, amount: number) => {
    try {
      setLoading(true);
      setError(null);

      // Generate a test reference
      const testReference = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create purchase record
      const { data, error: dbError } = await supabase
        .from('purchases')
        .insert([{
          agent_id: agentId,
          amount: amount,
          status: 'completed',
          stripe_payment_id: testReference
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      toast.success('Test purchase completed successfully!');
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Test purchase failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createPurchase,
    getUserPurchases,
    checkPurchaseStatus,
    simulateTestPurchase,
    loading,
    error
  };
}