
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useBottleScan() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const verifyBarcode = async (barcode: string) => {
    // In a real system, this would verify the barcode against a database
    // of valid bottle barcodes. For now, we'll consider all scans valid.
    
    // These are common barcode formats for bottles
    const validFormats = ['EAN-13', 'UPC-A'];
    
    // Basic validation: Check if it's a numeric code of right length
    const isEAN13 = barcode.length === 13 && !isNaN(Number(barcode));
    const isUPCA = barcode.length === 12 && !isNaN(Number(barcode));
    
    return isEAN13 || isUPCA;
  };

  const calculateTokens = (barcode: string) => {
    // In a real system, different bottles might have different values
    // based on size, material, etc. For now, we'll use a simple system.
    
    // Base value: 5 tokens
    let tokens = 5;
    
    // Add 1-3 random extra tokens to make it interesting
    tokens += Math.floor(Math.random() * 3) + 1;
    
    return tokens;
  };

  const recordScan = async (barcode: string, tokensEarned: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to record your recycling activity.",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Record the bottle scan
      const { error: scanError } = await supabase
        .from('bottle_scans')
        .insert({
          user_id: user.id,
          barcode: barcode,
          tokens_earned: tokensEarned,
          verified: true,
          location: 'Mobile App',
        });

      if (scanError) throw scanError;

      // Update the user's token balance
      const { data: tokenData, error: tokenFetchError } = await supabase
        .from('tokens')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (tokenFetchError && tokenFetchError.code !== 'PGRST116') {
        throw tokenFetchError;
      }

      if (tokenData) {
        // Update existing token record
        const { error: updateError } = await supabase
          .from('tokens')
          .update({ 
            balance: tokenData.balance + tokensEarned,
            last_updated: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        // Create new token record
        const { error: insertError } = await supabase
          .from('tokens')
          .insert({
            user_id: user.id,
            balance: tokensEarned,
            last_updated: new Date().toISOString()
          });

        if (insertError) throw insertError;
      }

      // Record transaction history
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          user_id: user.id,
          amount: tokensEarned,
          transaction_type: 'earn',
          description: 'Plastic bottle recycling',
        });

      if (transactionError) throw transactionError;

      return true;
    } catch (error) {
      console.error('Error recording scan:', error);
      toast({
        title: "Failed to record scan",
        description: "There was an error processing your recycling activity.",
        variant: "destructive",
      });
      return false;
    }
  };

  const startScanning = () => {
    setScanning(true);
    setResult(null);
    
    // In a real app, we would activate the camera here
    // For now, we'll simulate a scan after 2 seconds
    setTimeout(() => {
      const mockBarcodes = ['9781234567897', '5901234123457', '4006381333931'];
      const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
      
      processBarcodeScan(randomBarcode);
    }, 2000);
  };

  const processBarcodeScan = async (barcode: string) => {
    const isValid = await verifyBarcode(barcode);
    
    if (isValid) {
      const tokensEarned = calculateTokens(barcode);
      const recorded = await recordScan(barcode, tokensEarned);
      
      setResult(barcode);
      setScanning(false);
      
      if (recorded) {
        toast({
          title: "Scan Successful",
          description: `You earned ${tokensEarned} BebaPay tokens!`,
        });
      }
    } else {
      toast({
        title: "Invalid Barcode",
        description: "This doesn't appear to be a valid bottle barcode.",
        variant: "destructive",
      });
      setScanning(false);
    }
  };

  return {
    scanning,
    result,
    startScanning,
    processBarcodeScan,
  };
}
