
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Wallet, ArrowDown, ArrowUp, DollarSign, Phone } from 'lucide-react';

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const walletData = {
    balance: 125,
    transactions: [
      { id: 1, type: 'earn', amount: 5, date: '2023-09-25', description: 'Plastic bottle recycling' },
      { id: 2, type: 'earn', amount: 15, date: '2023-09-24', description: 'Multiple bottles recycled' },
      { id: 3, type: 'redeem', amount: -50, date: '2023-09-22', description: 'M-Pesa cash redemption' },
      { id: 4, type: 'earn', amount: 10, date: '2023-09-21', description: 'Plastic bottle recycling' },
      { id: 5, type: 'redeem', amount: -25, date: '2023-09-18', description: 'Airtime redemption' },
      { id: 6, type: 'earn', amount: 20, date: '2023-09-15', description: 'Recycling bonus' },
    ]
  };

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
                  <p className="text-3xl font-bold text-gray-900">{walletData.balance} <span className="text-bebapay-green">BP</span></p>
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
              <div className="space-y-4">
                {walletData.transactions.map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full ${transaction.type === 'earn' ? 'bg-bebapay-green bg-opacity-10' : 'bg-bebapay-orange bg-opacity-10'} flex items-center justify-center mr-3`}>
                        {transaction.type === 'earn' ? 
                          <ArrowDown className="h-5 w-5 text-bebapay-green" /> : 
                          <ArrowUp className="h-5 w-5 text-bebapay-orange" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-bold ${transaction.type === 'earn' ? 'text-bebapay-green' : 'text-bebapay-orange'}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} BP
                    </div>
                  </div>
                ))}
              </div>
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
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;
