// types.ts
export interface CommentResponse {
    id: string;
    article_id: string;
    article_slug: string;
    name: string;
    email: string;
    content: string;
    created_at: Date;
  }