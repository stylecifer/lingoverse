import { NextApiRequest, NextApiResponse } from 'next';

const ZOOM_AUTHORIZE_URL = 'https://zoom.us/oauth/authorize';
const CLIENT_ID = process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/api/zoom/callback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authUrl = `${ZOOM_AUTHORIZE_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.redirect(authUrl);
}
