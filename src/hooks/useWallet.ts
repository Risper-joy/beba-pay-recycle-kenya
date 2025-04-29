
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type Transaction = {
  id: string;
  created_at: string;
  amount: number;
  transaction_type: string;
  description: string;
};

export function useWallet() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchWalletData();
    } else {
      setBalance(0);
      setTransactions([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWalletData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Get token balance
      const { data: tokenData, error: tokenError } = await supabase
        .from('tokens')
        .select('balance')
        .eq('user_id', user.id)
        .single();
        
      if (tokenError && tokenError.code !== 'PGRST116') {
        throw tokenError;
      }
      
      // Get transactions
      const { data: transactionData, error: transactionError } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (transactionError) {
        throw transactionError;
      }
      
      setBalance(tokenData?.balance || 0);
      setTransactions(transactionData || []);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      toast({
        title: "Failed to load wallet",
        description: "There was an error loading your wallet information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const redeemTokens = async (
    amount: number, 
    rewardTitle: string,
    rewardValue: string
  ) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to redeem tokens.",
        variant: "destructive",
      });
      return false;
    }
    
    if (balance < amount) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough tokens for this reward.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // Update token balance
      const { error: updateError } = await supabase
        .from('tokens')
        .update({ 
          balance: balance - amount,
          last_updated: new Date().toISOString()
        })
        .eq('user_id', user.id);
        
      if (updateError) throw updateError;
      
      // Record transaction
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          user_id: user.id,
          amount: -amount,
          transaction_type: 'redeem',
          description: `Redeemed for ${rewardTitle} (${rewardValue})`,
        });
        
      if (transactionError) throw transactionError;
      
      // Refresh wallet data
      await fetchWalletData();
      
      toast({
        title: "Redemption successful",
        description: `You redeemed ${amount} tokens for ${rewardTitle}.`,
      });
      
      return true;
    } catch (error) {
      console.error("Error redeeming tokens:", error);
      toast({
        title: "Redemption failed",
        description: "There was an error processing your redemption.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    balance,
    transactions,
    loading,
    fetchWalletData,
    redeemTokens,
  };
}
