
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Wallet, UserCircle, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 text-bebapay-green mr-2" />
              <span className="text-xl font-bold text-bebapay-green">BebaPay</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/scan" className="px-3 py-2 rounded-md text-sm font-medium text-bebapay-blue hover:text-bebapay-green transition-colors">
              Scan & Earn
            </Link>
            <Link to="/rewards" className="px-3 py-2 rounded-md text-sm font-medium text-bebapay-blue hover:text-bebapay-green transition-colors">
              Rewards
            </Link>
            <Link to="/wallet" className="px-3 py-2 rounded-md text-sm font-medium text-bebapay-blue hover:text-bebapay-green transition-colors">
              Wallet
            </Link>
            <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-bebapay-blue hover:text-bebapay-green transition-colors">
              <UserCircle className="h-5 w-5 mr-1" />
              My Profile
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-bebapay-green focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-60" : "max-h-0"
        )}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/scan"
            className="block px-3 py-2 rounded-md text-base font-medium text-bebapay-blue hover:text-bebapay-green"
            onClick={() => setIsMenuOpen(false)}
          >
            Scan & Earn
          </Link>
          <Link
            to="/rewards"
            className="block px-3 py-2 rounded-md text-base font-medium text-bebapay-blue hover:text-bebapay-green"
            onClick={() => setIsMenuOpen(false)}
          >
            Rewards
          </Link>
          <Link
            to="/wallet"
            className="block px-3 py-2 rounded-md text-base font-medium text-bebapay-blue hover:text-bebapay-green"
            onClick={() => setIsMenuOpen(false)}
          >
            Wallet
          </Link>
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-md text-base font-medium text-bebapay-blue hover:text-bebapay-green"
            onClick={() => setIsMenuOpen(false)}
          >
            My Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
