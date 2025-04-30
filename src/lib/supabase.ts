
// Mock client for frontend-only implementation
export const supabase = {
  auth: {
    signInWithPassword: async () => ({ data: { user: { id: 'mock-user-id' } }, error: null }),
    signUp: async () => ({ data: { user: { id: 'mock-user-id' } }, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: { id: 'mock-user-id', email: 'user@example.com' } }, error: null }),
    getSession: async () => ({ data: { session: { user: { id: 'mock-user-id', email: 'user@example.com' } } }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: mockData[table]?.[0] || null, error: null }),
        order: () => ({
          limit: () => Promise.resolve({ data: mockData[table] || [], error: null })
        }),
        order: () => Promise.resolve({ data: mockData[table] || [], error: null })
      }),
      order: () => ({
        limit: () => Promise.resolve({ data: mockData[table] || [], error: null })
      })
    }),
    insert: (data: any) => Promise.resolve({ data, error: null }),
    update: (data: any) => ({
      eq: () => Promise.resolve({ data, error: null })
    })
  })
};

// Mock data for frontend-only implementation
const mockData: Record<string, any[]> = {
  profiles: [
    {
      id: 'mock-user-id',
      username: 'demo_user',
      full_name: 'Demo User',
      avatar_url: null,
      phone_number: '+254712345678',
      level: 'Silver Recycler',
      progress: 65,
    }
  ],
  rewards: [
    {
      id: "1", 
      title: 'M-Pesa Cash', 
      tokens_required: 50, 
      value: '100 KES', 
      description: 'Convert your BebaPay tokens directly to M-Pesa cash.',
      is_popular: true,
      is_available: true,
      image_url: null
    },
    { 
      id: "2", 
      title: 'Airtime Topup', 
      tokens_required: 25, 
      value: '50 KES', 
      description: 'Get mobile airtime for any carrier in Kenya.',
      is_popular: false,
      is_available: true,
      image_url: null
    }
  ],
  tokens: [
    {
      user_id: 'mock-user-id',
      balance: 125,
      last_updated: new Date().toISOString()
    }
  ],
  token_transactions: [
    {
      id: '1',
      user_id: 'mock-user-id',
      amount: 10,
      transaction_type: 'earn',
      description: 'Plastic bottle recycling',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      user_id: 'mock-user-id',
      amount: -25,
      transaction_type: 'redeem',
      description: 'Redeemed for Airtime Topup (50 KES)',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  bottle_scans: [
    {
      id: '1',
      user_id: 'mock-user-id',
      barcode: '5901234123457',
      tokens_earned: 8,
      verified: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      user_id: 'mock-user-id',
      barcode: '4006381333931',
      tokens_earned: 6,
      verified: true,
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ]
};
