
// Mock client for frontend-only implementation
export const supabase = {
  // Mock functions can be added here if needed
  auth: {
    signInWithPassword: async () => ({ data: { user: { id: 'mock-user-id' } }, error: null }),
    signUp: async () => ({ data: { user: { id: 'mock-user-id' } }, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
  },
};
