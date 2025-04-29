
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type Reward = {
  id: string;
  title: string;
  tokens_required: number;
  value: string;
  description: string;
  image_url: string | null;
  is_popular: boolean;
};

export function useRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('is_available', true)
        .order('tokens_required', { ascending: true });
        
      if (error) throw error;
      
      setRewards(data || []);
    } catch (error) {
      console.error("Error fetching rewards:", error);
      toast({
        title: "Failed to load rewards",
        description: "There was an error loading the rewards catalog.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    rewards,
    loading,
    fetchRewards,
  };
}
