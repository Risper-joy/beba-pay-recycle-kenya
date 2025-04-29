
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          phone_number: string | null
          level: string
          progress: number
        }
        Insert: {
          id: string
          created_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone_number?: string | null
          level?: string
          progress?: number
        }
        Update: {
          id?: string
          created_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone_number?: string | null
          level?: string
          progress?: number
        }
      }
      bottle_scans: {
        Row: {
          id: string
          created_at: string
          user_id: string
          barcode: string
          tokens_earned: number
          verified: boolean
          location: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          barcode: string
          tokens_earned: number
          verified?: boolean
          location?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          barcode?: string
          tokens_earned?: number
          verified?: boolean
          location?: string | null
        }
      }
      tokens: {
        Row: {
          id: string
          created_at: string
          user_id: string
          balance: number
          last_updated: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          balance: number
          last_updated?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          balance?: number
          last_updated?: string
        }
      }
      token_transactions: {
        Row: {
          id: string
          created_at: string
          user_id: string
          amount: number
          transaction_type: string
          description: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          amount: number
          transaction_type: string
          description: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          amount?: number
          transaction_type?: string
          description?: string
        }
      }
      rewards: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          tokens_required: number
          value: string
          image_url: string | null
          is_popular: boolean
          is_available: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          tokens_required: number
          value: string
          image_url?: string | null
          is_popular?: boolean
          is_available?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          tokens_required?: number
          value?: string
          image_url?: string | null
          is_popular?: boolean
          is_available?: boolean
        }
      }
    }
  }
}
