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
      attendees: {
        Row: {
          id: number
          joined_at: string
          meeting_id: number
          user_id: string
        }
        Insert: {
          id?: number
          joined_at: string
          meeting_id: number
          user_id: string
        }
        Update: {
          id?: number
          joined_at?: string
          meeting_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendees_meeting_id_fkey"
            columns: ["meeting_id"]
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendees_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
      meetings: {
        Row: {
          date: string | null
          description: string | null
          duration: number | null
          id: number
          inserted_at: string
          time: string | null
          title: string | null
          user_id: string
          zoom_link: string | null
        }
        Insert: {
          date?: string | null
          description?: string | null
          duration?: number | null
          id?: number
          inserted_at?: string
          time?: string | null
          title?: string | null
          user_id: string
          zoom_link?: string | null
        }
        Update: {
          date?: string | null
          description?: string | null
          duration?: number | null
          id?: number
          inserted_at?: string
          time?: string | null
          title?: string | null
          user_id?: string
          zoom_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meetings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
