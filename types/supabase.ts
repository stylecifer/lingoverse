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
        Relationships: []
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
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string | null
          event_id: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          end_time: string
          event_description: string | null
          event_id: number
          event_name: string
          start_time: string
          zoom_link: string | null
        }
        Insert: {
          end_time: string
          event_description?: string | null
          event_id?: number
          event_name: string
          start_time: string
          zoom_link?: string | null
        }
        Update: {
          end_time?: string
          event_description?: string | null
          event_id?: number
          event_name?: string
          start_time?: string
          zoom_link?: string | null
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
