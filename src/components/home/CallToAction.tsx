
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="py-16 bg-bebapay-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Join the Recycling Movement Today</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white text-opacity-90">
            Start earning rewards while helping to clean up Nairobi. Every bottle counts!
          </p>
          
          <div className="mt-8 flex justify-center">
            <Link to="/scan" className="bg-white text-bebapay-green font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2">
              Start Recycling Now
              <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold">Environmental Impact</h3>
              <p className="mt-2 text-white text-opacity-90">
                Reduce plastic pollution in Nairobi's streets and waterways.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold">Community Building</h3>
              <p className="mt-2 text-white text-opacity-90">
                Join a network of eco-conscious citizens making a difference.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold">Economic Benefits</h3>
              <p className="mt-2 text-white text-opacity-90">
                Earn rewards while contributing to a cleaner environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
