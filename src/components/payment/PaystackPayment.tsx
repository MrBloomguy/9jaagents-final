import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { CreditCard, Shield, Zap, TestTube, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { usePayment } from '../../hooks/usePayment';

interface PaystackPaymentProps {
  amount: number;
  agentId: string;
  agentName: string;
  onSuccess: (reference: string) => void;
  onClose?: () => void;
  disabled?: boolean;
  className?: string;
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  amount,
  agentId,
  agentName,
  onSuccess,
  onClose,
  disabled = false,
  className = ''
}) => {
  const { user } = useAuth();
  const { simulateTestPurchase, loading } = usePayment();
  const [isTestMode, setIsTestMode] = useState(true); // Default to test mode

  const config = {
    reference: `agent_${agentId}_${Date.now()}`,
    email: user?.email || '',
    amount: Math.round(amount * 100), // Paystack expects amount in kobo (smallest currency unit)
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here',
    currency: 'NGN',
    metadata: {
      agent_id: agentId,
      agent_name: agentName,
      user_id: user?.id || '',
      custom_fields: [
        {
          display_name: "Agent Name",
          variable_name: "agent_name",
          value: agentName
        }
      ]
    }
  };

  const initializePayment = usePaystackPayment(config);

  const handleTestPurchase = async () => {
    if (!user) {
      toast.error('Please login to make a purchase');
      return;
    }

    try {
      await simulateTestPurchase(agentId, amount);
      onSuccess(`test_${Date.now()}`);
    } catch (error) {
      console.error('Test purchase failed:', error);
    }
  };

  const handleRealPayment = () => {
    if (!user) {
      toast.error('Please login to make a purchase');
      return;
    }

    if (!config.publicKey || config.publicKey === 'pk_test_your_public_key_here') {
      toast.error('Payment gateway not configured. Please contact support.');
      return;
    }

    initializePayment({
      onSuccess: (reference) => {
        toast.success('Payment successful!');
        onSuccess(reference.reference);
      },
      onClose: () => {
        toast.info('Payment cancelled');
        onClose?.();
      }
    });
  };

  const isConfigured = config.publicKey && config.publicKey !== 'pk_test_your_public_key_here';

  return (
    <div className={className}>
      {/* Test Mode Toggle */}
      <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <TestTube className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Payment Mode
            </span>
          </div>
          <button
            onClick={() => setIsTestMode(!isTestMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isTestMode ? 'bg-amber-600' : 'bg-green-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isTestMode ? 'translate-x-1' : 'translate-x-6'
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-amber-700 dark:text-amber-400">
          {isTestMode 
            ? 'Test mode: Simulate purchase without real payment' 
            : 'Live mode: Real payment will be processed'
          }
        </p>
      </div>

      {/* Payment Button */}
      {isTestMode ? (
        <Button
          onClick={handleTestPurchase}
          disabled={disabled || loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          size="lg"
          loading={loading}
        >
          <TestTube className="w-5 h-5 mr-2" />
          Test Purchase ₦{amount.toLocaleString()}
        </Button>
      ) : (
        <Button
          onClick={handleRealPayment}
          disabled={disabled || !user || !isConfigured}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          size="lg"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Pay ₦{amount.toLocaleString()} with Paystack
        </Button>
      )}

      {/* Configuration Warning */}
      {!isTestMode && !isConfigured && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800 dark:text-red-300">
              Payment gateway not configured. Please use test mode or contact support.
            </span>
          </div>
        </div>
      )}
      
      {/* Security Features */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-1">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center space-x-1">
          <Zap className="w-4 h-4 text-blue-500" />
          <span>Instant Access</span>
        </div>
      </div>

      {/* Test Mode Instructions */}
      {isTestMode && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            Test Mode Instructions:
          </h4>
          <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
            <li>• No real money will be charged</li>
            <li>• Purchase will be simulated and recorded</li>
            <li>• You'll get instant access to the agent</li>
            <li>• Perfect for testing the platform</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaystackPayment;