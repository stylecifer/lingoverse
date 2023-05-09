import React from 'react';
import { useRouter } from 'next/router';
import { Button, Row, Spacer } from '@nextui-org/react';
import { FaVideo, FaKey } from 'react-icons/fa';

const ZoomIntegration = () => {
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
      <Row align="center">
        <Button onClick={authorizeZoom} size="md" auto>
          <FaKey />
          <Spacer x={0.5} />
          Authorize Zoom
        </Button>
      </Row>
      <Spacer y={0.5} />
      <Row align="center">
        <Button onClick={createZoomMeeting} size="md" auto>
          <FaVideo />
          <Spacer x={0.5} />
          Create Zoom Meeting
        </Button>
      </Row>
    </div>
  );
};

export default ZoomIntegration;
