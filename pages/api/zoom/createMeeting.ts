import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, topic, startTime, duration, isRecurring } = req.body;
  const zoomAccessToken = req.cookies.zoomAccessToken;

  if (!zoomAccessToken) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    // Convert the start_time to an ISO 8601 format with 'Z' to indicate UTC timezone
    const startTimeISOString = new Date(startTime).toISOString();

    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${zoomAccessToken}`,
      },
      body: JSON.stringify({
        topic: title || topic || 'Scheduled Meeting',
        type: isRecurring ? 8 : 2, // 2 for a scheduled meeting, 8 for a recurring meeting with no fixed time
        start_time: startTimeISOString,
        duration: duration || 60, // Default to 60 minutes if no duration is provided
        timezone: 'UTC',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating meeting');
    }

    const meetingData = await response.json();
    res.status(200).json(meetingData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating meeting' });
  }
}
