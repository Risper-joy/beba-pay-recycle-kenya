
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserCircle } from 'lucide-react';

type Profile = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone_number: string | null;
  level: string;
  progress: number;
};

const UserProfileHeader: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          // If profile doesn't exist, create a default one
          if (error.code === 'PGRST116') {
            const defaultProfile = {
              id: user.id,
              username: user.email?.split('@')[0] || null,
              full_name: null,
              avatar_url: null,
              phone_number: null,
              level: 'Bronze Recycler',
              progress: 0,
            };

            const { error: insertError } = await supabase
              .from('profiles')
              .insert(defaultProfile);

            if (!insertError) {
              setProfile(defaultProfile);
            } else {
              throw insertError;
            }
          } else {
            throw error;
          }
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        toast({
          title: 'Error',
          description: 'Failed to load user profile.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="bebapay-card mb-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="h-24 w-24 bg-bebapay-gray rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="h-16 w-16 text-gray-400" />
          )}
        </div>
        <div className="text-center sm:text-left flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {loading ? 'Loading...' : profile?.full_name || user.email?.split('@')[0] || 'BebaPay User'}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              {profile?.phone_number && (
                <p className="text-gray-600">{profile.phone_number}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <div className="h-5 w-5 rounded-full bg-bebapay-orange bg-opacity-10 flex items-center justify-center mr-2">
                <span className="text-xs text-bebapay-orange">⭐</span>
              </div>
              <span className="font-medium">
                {loading ? 'Loading...' : profile?.level || 'Bronze Recycler'}
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-bebapay-green h-2.5 rounded-full"
                style={{ width: `${loading ? 0 : profile?.progress || 0}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              {loading ? 'Loading...' : `${profile?.progress || 0}% to next level`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
