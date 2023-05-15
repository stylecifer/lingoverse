//pages/api/fetch-comments.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '@/lib/supabase';
import { CommentResponse as Data} from '@/types'

interface ErrorResponse {
  message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data[] | ErrorResponse>
) {
    const { id } = req.query;
    
    const { data, error }= await supabase
        .from('comments')
        .select('*')
        // .eq('id', id as string)
        .order('created_at', { ascending: false });
        if (error) {
            console.error('🙀 Error fetching comments:', error.message);
            res.status(500).json({ message: '😵‍💫 Error fetching comments' }); 
        } else {
            const responseData = data.map(item => ({
                id: item.id,
                article_id: item.article_id,
                article_slug: item.article_slug,
                name: item.name || 'Anonymous', // If 'name' is not present, it will default to 'Anonymous'
                email: item.email,
                content: item.content,
                created_at: item.created_at,    
            }));
            res.status(200).json(responseData);
        }
}
