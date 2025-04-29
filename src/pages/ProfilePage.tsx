
import React from 'react';
import Layout from '../components/layout/Layout';
import { UserCircle, Award, Recycle, Edit, Coins, Wallet, Check, Lock } from 'lucide-react';

const ProfilePage = () => {
  const userProfile = {
    name: 'James Mwangi',
    email: 'james.mwangi@example.com',
    phoneNumber: '+254 712 345 678',
    totalRecycled: 37,
    tokensEarned: 185,
    rewards: 3,
    level: 'Silver Recycler',
    progress: 65,
    achievements: [
      { id: 1, name: 'First Recycle', description: 'Recycled your first bottle', unlocked: true },
      { id: 2, name: 'Weekly Warrior', description: 'Recycled for 7 consecutive days', unlocked: true },
      { id: 3, name: '10 Bottles Club', description: 'Recycled 10 bottles', unlocked: true },
      { id: 4, name: 'Green Champion', description: 'Recycled 50 bottles total', unlocked: false },
      { id: 5, name: 'Environmental Hero', description: 'Reached Gold Recycler status', unlocked: false },
    ]
  };

  return (
    <Layout>
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bebapay-card mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="h-24 w-24 bg-bebapay-gray rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                <UserCircle className="h-16 w-16 text-gray-400" />
              </div>
              <div className="text-center sm:text-left flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                    <p className="text-gray-600">{userProfile.email}</p>
                    <p className="text-gray-600">{userProfile.phoneNumber}</p>
                  </div>
                  <button className="inline-flex items-center text-bebapay-blue hover:text-bebapay-green transition-colors mt-2 sm:mt-0">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-bebapay-orange mr-2" />
                    <span className="font-medium">{userProfile.level}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-bebapay-green h-2.5 rounded-full" style={{ width: `${userProfile.progress}%` }}></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">{userProfile.progress}% to Gold Recycler</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bebapay-card text-center">
              <div className="flex justify-center mb-2">
                <Recycle className="h-8 w-8 text-bebapay-green" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{userProfile.totalRecycled}</p>
              <p className="text-sm text-gray-600">Bottles Recycled</p>
            </div>
            
            <div className="bebapay-card text-center">
              <div className="flex justify-center mb-2">
                <Coins className="h-8 w-8 text-bebapay-blue" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{userProfile.tokensEarned}</p>
              <p className="text-sm text-gray-600">Tokens Earned</p>
            </div>
            
            <div className="bebapay-card text-center">
              <div className="flex justify-center mb-2">
                <Wallet className="h-8 w-8 text-bebapay-orange" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{userProfile.rewards}</p>
              <p className="text-sm text-gray-600">Rewards Redeemed</p>
            </div>
          </div>
          
          <div className="bebapay-card mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="space-y-4">
              {userProfile.achievements.map(achievement => (
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
                  <p className="text-3xl font-bold text-bebapay-green">1.85</p>
                  <p className="ml-2 text-gray-600">kg</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">CO₂ Emissions Saved</p>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-bebapay-blue">4.44</p>
                  <p className="ml-2 text-gray-600">kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
