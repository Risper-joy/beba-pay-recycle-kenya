
import React from 'react';
import { Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <Recycle className="h-6 w-6 text-bebapay-green mr-2" />
              <span className="text-lg font-bold text-bebapay-green">BebaPay</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Incentivizing recycling in Nairobi through blockchain rewards.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">App</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/scan" className="text-sm text-gray-500 hover:text-bebapay-green">
                  Scan & Earn
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-sm text-gray-500 hover:text-bebapay-green">
                  Rewards
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="text-sm text-gray-500 hover:text-bebapay-green">
                  Wallet
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-bebapay-green">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm text-gray-500 hover:text-bebapay-green">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-bebapay-green">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-bebapay-green">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-bebapay-green">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BebaPay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
