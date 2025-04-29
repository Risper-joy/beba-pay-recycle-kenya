
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Recycle, Coins, Wallet, Check, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import UserProfileHeader from '@/components/profile/UserProfileHeader';
import AuthModal from '@/components/auth/AuthModal';

const ProfilePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRecycled: 0,
    tokensEarned: 0,
    rewards: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const achievements = [
    { id: 1, name: 'First Recycle', description: 'Recycled your first bottle', unlocked: stats.totalRecycled > 0 },
    { id: 2, name: 'Weekly Warrior', description: 'Recycled for 7 consecutive days', unlocked: stats.totalRecycled >= 7 },
    { id: 3, name: '10 Bottles Club', description: 'Recycled 10 bottles', unlocked: stats.totalRecycled >= 10 },
    { id: 4, name: 'Green Champion', description: 'Recycled 50 bottles total', unlocked: stats.totalRecycled >= 50 },
    { id: 5, name: 'Environmental Hero', description: 'Reached Gold Recycler status', unlocked: stats.tokensEarned >= 500 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get total recycled bottles
        const { data: scansData, error: scansError } = await supabase
          .from('bottle_scans')
          .select('*')
          .eq('user_id', user.id);

        if (scansError) throw scansError;

        // Get token balance
        const { data: tokensData, error: tokensError } = await supabase
          .from('tokens')
          .select('balance')
          .eq('user_id', user.id)
          .single();

        if (tokensError && tokensError.code !== 'PGRST116') throw tokensError;

        // Get redeemed rewards
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('token_transactions')
          .select('*')
          .eq('user_id', user.id)
          .eq('transaction_type', 'redeem');

        if (transactionsError) throw transactionsError;

        setStats({
          totalRecycled: scansData?.length || 0,
          tokensEarned: tokensData?.balance || 0,
          rewards: transactionsData?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (!user && !loading) {
    return (
      <Layout>
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
            <p className="mt-4 text-lg text-gray-600">
              Sign in to view and manage your BebaPay profile
            </p>
          </div>

          <div className="max-w-md mx-auto bebapay-card text-center py-10">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to view your profile, achievements, and recycling stats.
            </p>
            <button 
              className="bebapay-button" 
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </button>
            {showAuthModal && (
              <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)} 
              />
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <UserProfileHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bebapay-card text-center">
              <div className="flex justify-center mb-2">
                <Recycle className="h-8 w-8 text-bebapay-green" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '...' : stats.totalRecycled}
              </p>
              <p className="text-sm text-gray-600">Bottles Recycled</p>
            </div>
            
            <div className="bebapay-card text-center">
              <div className="flex justify-center mb-2">
                <Coins className="h-8 w-8 text-bebapay-blue" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '...' : stats.tokensEarned}
              </p>
              <p className="text-sm text-gray-600">Tokens Earned</p>
            </div>
            
            <div className="bebapay-card text-center">
              <div className="flex justify-center mb-2">
                <Wallet className="h-8 w-8 text-bebapay-orange" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '...' : stats.rewards}
              </p>
              <p className="text-sm text-gray-600">Rewards Redeemed</p>
            </div>
          </div>
          
          <div className="bebapay-card mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="space-y-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className={`flex items-center p-3 rounded-lg ${achievement.unlocked ? 'bg-bebapay-green bg-opacity-10' : 'bg-gray-100'}`}>
                  <div className={`h-10 w-10 rounded-full ${achievement.unlocked ? 'bg-bebapay-green' : 'bg-gray-300'} flex items-center justify-center mr-4`}>
                    {achievement.unlocked ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <Lock className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-medium ${achievement.unlocked ? 'text-bebapay-green' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bebapay-card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Environmental Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Plastic Waste Reduction</p>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-bebapay-green">
                    {loading ? '...' : (stats.totalRecycled * 0.05).toFixed(2)}
                  </p>
                  <p className="ml-2 text-gray-600">kg</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">CO₂ Emissions Saved</p>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-bebapay-blue">
                    {loading ? '...' : (stats.totalRecycled * 0.12).toFixed(2)}
                  </p>
                  <p className="ml-2 text-gray-600">kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </Layout>
  );
};

export default ProfilePage;
