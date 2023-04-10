import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { serialize } from 'cookie';

const CLIENT_ID = process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_ZOOM_CLIENT_SECRET;
const REDIRECT_URL = process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URL;

const ZOOM_TOKEN_URL = 'https://zoom.us/oauth/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    res.status(400).json({ message: 'Authorization code not found' });
    return;
  }

  try {
    const response = await axios.post(ZOOM_TOKEN_URL, null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URL,
      },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const zoomAccessToken = response.data.access_token;

    res.setHeader('Set-Cookie', serialize('zoomAccessToken', zoomAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    }));

    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching access token' });
  }
}
