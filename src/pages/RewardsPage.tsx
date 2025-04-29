
import React from 'react';
import Layout from '../components/layout/Layout';
import { Coins } from 'lucide-react';

const RewardsPage = () => {
  const rewards = [
    { 
      id: 1, 
      title: 'M-Pesa Cash', 
      tokens: 50, 
      value: '100 KES', 
      description: 'Convert your BebaPay tokens directly to M-Pesa cash.',
      popular: true,
      image: 'mpesa'
    },
    { 
      id: 2, 
      title: 'Airtime Topup', 
      tokens: 25, 
      value: '50 KES', 
      description: 'Get mobile airtime for any carrier in Kenya.',
      popular: false,
      image: 'airtime'
    },
    { 
      id: 3, 
      title: 'Shopping Voucher', 
      tokens: 100, 
      value: '250 KES', 
      description: 'Redeem for shopping vouchers at participating stores.',
      popular: false,
      image: 'shopping'
    },
    { 
      id: 4, 
      title: 'Food Delivery Credit', 
      tokens: 75, 
      value: '200 KES', 
      description: 'Get credit for your next meal delivery.',
      popular: false,
      image: 'food'
    }
  ];

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
                <p className="text-3xl font-bold text-gray-900">125 <span className="text-bebapay-green">BP</span></p>
              </div>
            </div>
            <div>
              <button className="bebapay-button">
                Earn More
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <div key={reward.id} className="bebapay-card relative overflow-hidden">
              {reward.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-bebapay-orange text-white text-xs font-bold px-3 py-1 transform rotate-0 origin-top-right">
                    Popular
                  </div>
                </div>
              )}
              
              <div className="h-40 bg-bebapay-gray rounded-md mb-4 flex items-center justify-center">
                <div className="text-4xl">
                  {reward.image === 'mpesa' && '💰'}
                  {reward.image === 'airtime' && '📱'}
                  {reward.image === 'shopping' && '🛍️'}
                  {reward.image === 'food' && '🍔'}
                </div>
              </div>
              
              <h3 className="text-xl font-medium text-gray-900">{reward.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-bebapay-green font-bold">{reward.tokens} BP</span>
                <span className="text-gray-600">{reward.value}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{reward.description}</p>
              <button className="bebapay-button-secondary w-full mt-4">
                Redeem
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
