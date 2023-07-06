// meetings/index.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useSupabaseClient, User } from '@supabase/auth-helpers-react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { Text, Button } from '@nextui-org/react'
type MeetingPageProps = {
    user: User | null;
}

const MeetingPage: NextPage<MeetingPageProps> = ({ user }) => {
    const router = useRouter();
    const { id } = router.query;
    const supabaseClient = useSupabaseClient();
  
  const initialState = {
    id: "",
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    zoom_link: "",
  };

  const [meetingData, setMeetingData] = useState(initialState);
  const [meetingJoined, setMeetingJoined] = useState(false);

  useEffect(() => {
    const fetchMeetingAndAttendeeData = async () => {
      const { data: meetingData, error: meetingError } = await supabaseClient
        .from("meetings")
        .select("*")
        .filter("id", "eq", id)
        .single();

      if (meetingError) {
        console.log(meetingError);
        return;
      }

      const { data: attendeeData, error: attendeeError } = await supabaseClient
        .from("attendees")
        .select("*")
        .filter("meeting_id", "eq", id)
        .filter("user_id", "eq", user?.id)
        .single();

      if (attendeeError) {
        console.log(attendeeError);
        return;
      }
// Explicit typing of the meetingData
      const typeMeetingData = meetingData && {
        id: meetingData.id,
        title: meetingData.title,
        description: meetingData.description,
        date: meetingData.date,
        time: meetingData.time,
        duration: meetingData.duration,
        zoom_link: meetingData.zoom_link,
      }
      setMeetingData(typeMeetingData || initialState);
      setMeetingJoined(Boolean(attendeeData));
    };

    fetchMeetingAndAttendeeData();
  }, [id, supabaseClient, user?.id]);

  const countdown = () => {
    const meetingTime = `${meetingData.date}T${meetingData.time}`;
    return formatDistanceToNow(parseISO(meetingTime), { addSuffix: true });
  };

  const isMeetingTimePast = () => {
    const meetingTime = `${meetingData.date}T${meetingData.time}`;
    return new Date() > parseISO(meetingTime);
  };

  const addAttendee = async () => {
    const { data, error } = await supabaseClient
      .from('attendees')
      .insert([
        { 
          meeting_id: meetingData.id,
          user_id: user?.id,
          joined_at: new Date() 
        },
      ]);

    if (error) {
      console.log(error);
    } else {
      setMeetingJoined(true);
    }
  };

  if (!user) {
    router.push('/login');
  }

  return (
    <>
      {/* Display meeting details with the NextUI library here... */}
    <Text h1>{meetingData.title}</Text>
    <Text size="lg">{meetingData.description}</Text>
    <Text h4>{meetingData.date}</Text>
    <Text h4>{meetingData.time}</Text>
    <Text h4>{meetingData.duration}</Text>

      !meetingJoined ? (
        <Button onClick={addAttendee}>Register</Button>
      ) : !isMeetingTimePast() ? (
        <Button>Join in {countdown()}</Button>
      ) : (
        <Button onClick={() => window.location.href = meetingData.zoom_link}>
          Join Now
        </Button>
      )
    </>
  )
};

export const GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = useSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };

  return {
    props: {
      user: session.user
    }
  };
};

export default MeetingPage;
