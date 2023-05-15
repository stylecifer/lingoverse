//api/create-comment.ts
import { supabase } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string 
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) 
  {
        const { article_slug, name, email, content } = req.body;

        const { error } = await supabase
        .from("comments")
        .insert([{
            article_slug: article_slug,
            name: name,
            email: email,
            content: content,
        }]);


      if (error) {
        console.error('🤦🏻‍♂️ Error inserting comment:', error.message);
        res.status(500).json({ name: '😵‍💫 Error inserting comment' })
      } else {
        res.status(200).json({ name: '😉 Comment inserted successfully' })
        }
    };


