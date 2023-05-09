import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { article_slug, content } = req.body;

    const { data, error } = await supabase.from('comments').insert([
      {
        article_slug,
        content,
      },
    ]);

    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(201).json(data);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
