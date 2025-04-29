
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Coins } from 'lucide-react';
import { useRewards } from '@/hooks/useRewards';
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const RewardsPage = () => {
  const { rewards, loading } = useRewards();
  const { balance, redeemTokens } = useWallet();
  const { user } = useAuth();
  const { toast } = useToast();
  const [redeeming, setRedeeming] = useState<string | null>(null);

  const handleRedeem = async (rewardId: string, tokens: number, title: string, value: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to redeem rewards.",
        variant: "destructive",
      });
      return;
    }
    
    if (balance < tokens) {
      toast({
        title: "Insufficient tokens",
        description: `You need ${tokens} tokens to redeem this reward. You have ${balance} tokens.`,
        variant: "destructive",
      });
      return;
    }
    
    setRedeeming(rewardId);
    
    try {
      const success = await redeemTokens(tokens, title, value);
      if (success) {
        toast({
          title: "Reward redeemed!",
          description: `You have successfully redeemed ${title} for ${tokens} tokens.`,
        });
      }
    } finally {
      setRedeeming(null);
    }
  };

  // Default rewards as fallback if loading or no rewards from database
  const defaultRewards = [
    { 
      id: "1", 
      title: 'M-Pesa Cash', 
      tokens_required: 50, 
      value: '100 KES', 
      description: 'Convert your BebaPay tokens directly to M-Pesa cash.',
      is_popular: true,
      image_url: null
    },
    { 
      id: "2", 
      title: 'Airtime Topup', 
      tokens_required: 25, 
      value: '50 KES', 
      description: 'Get mobile airtime for any carrier in Kenya.',
      is_popular: false,
      image_url: null
    },
    { 
      id: "3", 
      title: 'Shopping Voucher', 
      tokens_required: 100, 
      value: '250 KES', 
      description: 'Redeem for shopping vouchers at participating stores.',
      is_popular: false,
      image_url: null
    },
    { 
      id: "4", 
      title: 'Food Delivery Credit', 
      tokens_required: 75, 
      value: '200 KES', 
      description: 'Get credit for your next meal delivery.',
      is_popular: false,
      image_url: null
    }
  ];
  
  // Use database rewards if available, otherwise use defaults
  const displayRewards = loading || rewards.length === 0 ? defaultRewards : rewards;

  return (
    <Layout>
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Rewards Marketplace</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Redeem your BebaPay tokens for valuable rewards and services
          </p>
        </div>
        
        <div className="bebapay-card mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-bebapay-orange bg-opacity-10 flex items-center justify-center mr-4">
                <Coins className="h-6 w-6 text-bebapay-orange" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-600">Available Balance</h2>
                <p className="text-3xl font-bold text-gray-900">{user ? balance : 0} <span className="text-bebapay-green">BP</span></p>
              </div>
            </div>
            <div>
              <button className="bebapay-button" onClick={() => window.location.href = '/scan'}>
                Earn More
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRewards.map((reward) => (
            <div key={reward.id} className="bebapay-card relative overflow-hidden">
              {reward.is_popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-bebapay-orange text-white text-xs font-bold px-3 py-1 transform rotate-0 origin-top-right">
                    Popular
                  </div>
                </div>
              )}
              
              <div className="h-40 bg-bebapay-gray rounded-md mb-4 flex items-center justify-center">
                <div className="text-4xl">
                  {reward.title.includes('M-Pesa') && '💰'}
                  {reward.title.includes('Airtime') && '📱'}
                  {reward.title.includes('Shopping') && '🛍️'}
                  {reward.title.includes('Food') && '🍔'}
                </div>
              </div>
              
              <h3 className="text-xl font-medium text-gray-900">{reward.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-bebapay-green font-bold">{reward.tokens_required} BP</span>
                <span className="text-gray-600">{reward.value}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{reward.description}</p>
              <button 
                className={`bebapay-button-secondary w-full mt-4 ${!user || redeeming === reward.id ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={() => handleRedeem(reward.id, reward.tokens_required, reward.title, reward.value)}
                disabled={!user || redeeming === reward.id}
              >
                {redeeming === reward.id ? 'Processing...' : 'Redeem'}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How Rewards Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bebapay-card text-center">
              <div className="mx-auto h-12 w-12 bg-bebapay-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <span className="text-bebapay-green font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium">Collect Tokens</h3>
              <p className="mt-2 text-sm text-gray-600">
                Earn BebaPay tokens by recycling plastic bottles at our collection points.
              </p>
            </div>
            
            <div className="bebapay-card text-center">
              <div className="mx-auto h-12 w-12 bg-bebapay-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <span className="text-bebapay-green font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium">Choose Rewards</h3>
              <p className="mt-2 text-sm text-gray-600">
                Browse our marketplace and select the reward you want to redeem.
              </p>
            </div>
            
            <div className="bebapay-card text-center">
              <div className="mx-auto h-12 w-12 bg-bebapay-green bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <span className="text-bebapay-green font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium">Instant Redemption</h3>
              <p className="mt-2 text-sm text-gray-600">
                Smart contracts ensure your rewards are delivered instantly to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RewardsPage;
