export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          article_slug: string
          content: string | null
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          article_slug: string
          content?: string | null
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          article_slug?: string
          content?: string | null
          created_at?: string | null
          id?: string
          title?: string
        }
      }
      comments: {
        Row: {
          article_slug: string | null
          content: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          article_slug?: string | null
          content?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          article_slug?: string | null
          content?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          teacher: boolean | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          teacher?: boolean | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          teacher?: boolean | null
          username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
