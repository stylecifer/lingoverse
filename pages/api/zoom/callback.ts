import { NextApiRequest, NextApiResponse } from 'next';
import zoomApi from '@/utils/zoomApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string | undefined;

  if (!code) {
    res.status(400).json({ error: 'Authorization code is missing' });
    return;
  }

  const clientId = process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_ZOOM_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    console.error('Environment variables are not defined');
    res.status(500).json({ error: 'Server error' });
    return;
  }

  try {
    const response = await zoomApi.post('/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const { access_token, refresh_token } = response.data;

    // TODO: Save the access token and refresh token to your database

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get access token' });
  }
}
