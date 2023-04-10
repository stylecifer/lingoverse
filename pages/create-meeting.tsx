import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateMeetingPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const createMeeting = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/zoom/createMeeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          topic,
          startTime,
          duration,
          isRecurring,
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating meeting');
      }

      const meetingData = await response.json();
      router.push(`/?success=Meeting created successfully! Meeting ID: ${meetingData.id}`);
    } catch (error) {
      console.error(error);
      alert('Error creating meeting. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Zoom Meeting</h1>
      <form onSubmit={createMeeting}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input type="datetime-local" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="duration">Duration (minutes):</label>
          <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div>
          <label htmlFor="isRecurring">Recurring Meeting:</label>
          <input type="checkbox" id="isRecurring" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
        </div>
        <button type="submit">Create Meeting</button>
      </form>
    </div>
  );
};

export default CreateMeetingPage;
