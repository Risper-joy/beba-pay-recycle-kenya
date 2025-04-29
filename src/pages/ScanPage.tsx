
import React from 'react';
import Layout from '../components/layout/Layout';
import BarcodeScanner from '../components/scan/BarcodeScanner';

const ScanPage = () => {
  return (
    <Layout>
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Scan & Earn</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Scan the barcode on your plastic bottles to earn BebaPay tokens
          </p>
        </div>
        
        <BarcodeScanner />
        
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recycling Centers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Westlands Recycling Hub",
                address: "123 Waiyaki Way, Westlands",
                hours: "8:00 AM - 6:00 PM"
              },
              {
                name: "Eastlands Collection Point",
                address: "45 Jogoo Road, Eastlands",
                hours: "9:00 AM - 5:00 PM"
              },
              {
                name: "CBD Recycling Center",
                address: "78 Moi Avenue, CBD",
                hours: "8:00 AM - 8:00 PM"
              },
              {
                name: "Karen Collection Point",
                address: "12 Karen Road, Karen",
                hours: "8:00 AM - 4:00 PM"
              }
            ].map((center, index) => (
              <div key={index} className="bebapay-card">
                <h3 className="font-medium text-gray-900">{center.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{center.address}</p>
                <p className="text-sm text-bebapay-green font-medium mt-2">Hours: {center.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScanPage;
