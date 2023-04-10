import React from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  const { success } = router.query;

  const authorizeZoom = async () => {
    window.location.href = '/api/zoom/auth';
  };

  const createZoomMeeting = () => {
    // Redirect to the create-meeting page
    router.push('/create-meeting');
  };

  return (
    <div>
      {success && <div>{success}</div>}
      <button onClick={authorizeZoom}>Authorize Zoom</button>
      <button onClick={createZoomMeeting}>Create Zoom Meeting</button>
    </div>
  );
};

export default HomePage;
