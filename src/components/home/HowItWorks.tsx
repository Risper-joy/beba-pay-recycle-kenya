
import React from 'react';
import { Barcode, Recycle, Wallet } from 'lucide-react';

const steps = [
  {
    icon: <Barcode className="h-12 w-12 text-bebapay-blue" />,
    title: 'Scan Bottles',
    description: 'Scan the barcode on plastic bottles at our designated recycling centers using the BebaPay app.'
  },
  {
    icon: <Recycle className="h-12 w-12 text-bebapay-green" />,
    title: 'Recycle',
    description: 'Drop the bottles in our IoT-enabled smart bins that verify the weight and material authenticity.'
  },
  {
    icon: <Wallet className="h-12 w-12 text-bebapay-orange" />,
    title: 'Earn Rewards',
    description: 'Receive BebaPay tokens on the blockchain that you can redeem for airtime or M-Pesa cash.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">How BebaPay Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Three simple steps to start earning rewards for your recycling efforts
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bebapay-card transition-transform hover:scale-105 hover:shadow-lg">
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 text-center">{step.title}</h3>
                <p className="mt-2 text-gray-600 text-center">{step.description}</p>
                <div className="mt-4 flex justify-center">
                  <div className="h-10 w-10 rounded-full bg-bebapay-gray flex items-center justify-center font-bold text-bebapay-blue">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
