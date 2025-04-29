import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Wallet, ArrowDown, ArrowUp, DollarSign, Phone } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { balance, transactions, loading } = useWallet();
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Your Wallet</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your BebaPay tokens, view transactions, and redeem rewards
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bebapay-card mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-bebapay-green bg-opacity-10 flex items-center justify-center mr-4">
                  <Wallet className="h-6 w-6 text-bebapay-green" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-600">Total Balance</h2>
                  <p className="text-3xl font-bold text-gray-900">{loading ? '...' : balance} <span className="text-bebapay-green">BP</span></p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="bebapay-button-secondary">
                  <ArrowDown size={16} />
                  Receive
                </button>
                <button className="bebapay-button-accent">
                  <ArrowUp size={16} />
                  Redeem
                </button>
              </div>
            </div>
          </div>
          
          {!user ? (
            <div className="bebapay-card text-center py-10">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Sign In Required</h3>
              <p className="text-gray-600 mb-6">Please sign in to access your wallet and transaction history.</p>
              <button className="bebapay-button">Sign In</button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex border-b">
                  <button 
                    className={`py-3 px-5 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-bebapay-green text-bebapay-green' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`py-3 px-5 text-sm font-medium ${activeTab === 'transactions' ? 'border-b-2 border-bebapay-green text-bebapay-green' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('transactions')}
                  >
                    Transactions
                  </button>
                  <button 
                    className={`py-3 px-5 text-sm font-medium ${activeTab === 'redeem' ? 'border-b-2 border-bebapay-green text-bebapay-green' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('redeem')}
                  >
                    Redeem
                  </button>
                </div>
              </div>
              
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bebapay-card">
                    <h3 className="text-lg font-medium text-gray-900">Monthly Activity</h3>
                    <div className="mt-4 h-32 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">Activity chart placeholder</p>
                    </div>
                  </div>
                  <div className="bebapay-card">
                    <h3 className="text-lg font-medium text-gray-900">Redemption Options</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>M-Pesa Cash</span>
                        <span className="font-medium">50 BP = 100 KES</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Airtime</span>
                        <span className="font-medium">25 BP = 50 KES</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shopping Voucher</span>
                        <span className="font-medium">100 BP = 250 KES</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'transactions' && (
                <div className="bebapay-card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
                  {loading ? (
                    <div className="flex justify-center py-10">
                      <div className="h-8 w-8 border-4 border-bebapay-green border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : transactions.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No transactions found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transactions.map(transaction => (
                        <div key={transaction.id} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                          <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full ${transaction.transaction_type === 'earn' ? 'bg-bebapay-green bg-opacity-10' : 'bg-bebapay-orange bg-opacity-10'} flex items-center justify-center mr-3`}>
                              {transaction.transaction_type === 'earn' ? 
                                <ArrowDown className="h-5 w-5 text-bebapay-green" /> : 
                                <ArrowUp className="h-5 w-5 text-bebapay-orange" />
                              }
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.description}</p>
                              <p className="text-xs text-gray-500">{format(new Date(transaction.created_at), 'yyyy-MM-dd')}</p>
                            </div>
                          </div>
                          <div className={`font-bold ${transaction.amount > 0 ? 'text-bebapay-green' : 'text-bebapay-orange'}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} BP
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'redeem' && (
                <div className="bebapay-card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Redeem Your Tokens</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-bebapay-green cursor-pointer transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 rounded-full bg-bebapay-green bg-opacity-10 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-bebapay-green" />
                        </div>
                        <div className="bg-bebapay-green bg-opacity-10 rounded-full px-3 py-1">
                          <span className="text-xs font-medium text-bebapay-green">Most Popular</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900">M-Pesa Cash</h4>
                      <p className="text-sm text-gray-500 mt-1">Convert your tokens to M-Pesa cash instantly</p>
                      <div className="mt-3">
                        <span className="font-bold text-bebapay-green">50 BP = 100 KES</span>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-bebapay-blue cursor-pointer transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 rounded-full bg-bebapay-blue bg-opacity-10 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-bebapay-blue" />
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900">Airtime</h4>
                      <p className="text-sm text-gray-500 mt-1">Get airtime for any mobile carrier</p>
                      <div className="mt-3">
                        <span className="font-bold text-bebapay-blue">25 BP = 50 KES</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Redeem</label>
                    <div className="flex gap-2 mb-4">
                      {[25, 50, 100].map(amount => (
                        <button key={amount} className="border border-gray-300 rounded-lg py-2 px-4 text-sm font-medium hover:bg-bebapay-green hover:text-white hover:border-bebapay-green transition-colors">
                          {amount} BP
                        </button>
                      ))}
                      <input type="number" placeholder="Custom" className="border border-gray-300 rounded-lg py-2 px-4 text-sm font-medium flex-1" />
                    </div>
                    
                    <button className="bebapay-button w-full">
                      Redeem Now
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;
