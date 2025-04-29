
import React, { useState } from 'react';
import { Barcode, Recycle } from 'lucide-react';

const BarcodeScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const startScanning = () => {
    setScanning(true);
    setResult(null);
    
    // In a real app, we would activate the camera here
    // For now, we'll simulate a scan after 2 seconds
    setTimeout(() => {
      const mockBarcodes = ['9781234567897', '5901234123457', '4006381333931'];
      const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
      setResult(randomBarcode);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="bebapay-card max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Scan Bottle Barcode</h2>
      
      <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square relative mb-6">
        {scanning ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-16 w-16 border-4 border-bebapay-green border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-medium">Scanning...</p>
          </div>
        ) : result ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bebapay-green bg-opacity-10 p-6">
            <div className="bg-white rounded-xl p-6 shadow-md max-w-xs w-full">
              <div className="flex justify-center mb-4">
                <Recycle className="h-12 w-12 text-bebapay-green" />
              </div>
              <h3 className="text-lg font-medium text-center">Bottle Scanned!</h3>
              <p className="mt-2 text-sm text-gray-600 text-center">Barcode: {result}</p>
              <p className="mt-4 text-center font-medium text-bebapay-green">+5 BebaPay Tokens</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Barcode className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center px-8">
              Position the barcode within the camera view to scan
            </p>
          </div>
        )}
      </div>
      
      <button
        onClick={startScanning}
        disabled={scanning}
        className={`bebapay-button w-full ${scanning ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {scanning ? 'Scanning...' : result ? 'Scan Another Bottle' : 'Start Scanning'}
      </button>
      
      <div className="mt-6 text-sm text-gray-600">
        <p className="font-medium mb-2">Instructions:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Make sure the barcode is clearly visible</li>
          <li>Hold your phone steady over the barcode</li>
          <li>Once scanned, place the bottle in the recycling bin</li>
          <li>Tokens will be credited to your wallet automatically</li>
        </ol>
      </div>
    </div>
  );
};

export default BarcodeScanner;
