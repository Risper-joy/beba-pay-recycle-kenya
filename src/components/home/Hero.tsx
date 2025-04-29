
import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-bebapay-gray py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              <span className="block">Recycle Plastic.</span>
              <span className="block text-bebapay-green">Earn Rewards.</span>
              <span className="block">Save Nairobi.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl">
              Join the BebaPay movement to clean up Nairobi while earning tokens that you can convert to 
              airtime or M-Pesa cash rewards.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/scan" className="bebapay-button">
                Start Recycling
                <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="bebapay-button-secondary">
                Learn More
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-2xl font-bold text-bebapay-green">+10k</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-2xl font-bold text-bebapay-blue">+50k</p>
                <p className="text-sm text-gray-600">Bottles Recycled</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-2xl font-bold text-bebapay-orange">+5M</p>
                <p className="text-sm text-gray-600">Tokens Earned</p>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-bebapay-green bg-opacity-10 rounded-3xl transform rotate-6"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-lg">
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-bebapay-gray flex items-center justify-center">
                <div className="p-8 text-center">
                  <Recycle className="h-16 w-16 text-bebapay-green mx-auto mb-4 animate-pulse-light" />
                  <p className="text-lg font-medium text-gray-700">Scan bottles, earn tokens</p>
                  <p className="text-sm text-gray-500 mt-2">Use our smart bins at recycling centers</p>
                </div>
              </div>
              
              <div className="mt-6 bg-bebapay-gray rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Recent Reward</span>
                  <span className="text-bebapay-green font-bold">+25 BebaPay</span>
                </div>
                <div className="h-2 bg-white rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-bebapay-green rounded-full w-[65%]"></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Progress</span>
                  <span>65% to next reward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
