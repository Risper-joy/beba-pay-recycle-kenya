
import React from 'react';
import { Coins, Recycle, ArrowRight, Wallet, Barcode, Trash } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <div className="py-16 bg-bebapay-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose BebaPay</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Our unique approach combines environmental impact with financial incentives
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bebapay-card">
            <div className="h-12 w-12 mb-4 rounded-xl bg-bebapay-green bg-opacity-10 flex items-center justify-center">
              <Recycle className="h-6 w-6 text-bebapay-green" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Transparent Recycling</h3>
            <p className="mt-2 text-gray-600">
              Every bottle is tracked on the blockchain, ensuring transparency and accountability in the recycling process.
            </p>
          </div>
          
          <div className="bebapay-card">
            <div className="h-12 w-12 mb-4 rounded-xl bg-bebapay-blue bg-opacity-10 flex items-center justify-center">
              <Coins className="h-6 w-6 text-bebapay-blue" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Earn Real Value</h3>
            <p className="mt-2 text-gray-600">
              BebaPay tokens have real-world value, convertible to mobile airtime or M-Pesa cash that you can use daily.
            </p>
          </div>
          
          <div className="bebapay-card">
            <div className="h-12 w-12 mb-4 rounded-xl bg-bebapay-orange bg-opacity-10 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-bebapay-orange" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Smart Contract Payouts</h3>
            <p className="mt-2 text-gray-600">
              Automatic payouts through blockchain smart contracts ensure you get rewarded instantly for your contributions.
            </p>
          </div>
          
          <div className="bebapay-card">
            <div className="h-12 w-12 mb-4 rounded-xl bg-bebapay-green bg-opacity-10 flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-bebapay-green" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Mobile-First Experience</h3>
            <p className="mt-2 text-gray-600">
              Our user-friendly mobile app makes recycling convenient and rewarding with a simple scan-and-earn system.
            </p>
          </div>
          
          <div className="bebapay-card">
            <div className="h-12 w-12 mb-4 rounded-xl bg-bebapay-blue bg-opacity-10 flex items-center justify-center">
              <Barcode className="h-6 w-6 text-bebapay-blue" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Barcode Verification</h3>
            <p className="mt-2 text-gray-600">
              Advanced barcode scanning ensures only legitimate plastic bottles are accepted for recycling rewards.
            </p>
          </div>
          
          <div className="bebapay-card">
            <div className="h-12 w-12 mb-4 rounded-xl bg-bebapay-orange bg-opacity-10 flex items-center justify-center">
              <Trash className="h-6 w-6 text-bebapay-orange" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">IoT Smart Bins</h3>
            <p className="mt-2 text-gray-600">
              Our smart bins validate material type and weight, ensuring fair rewards based on your actual contribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
