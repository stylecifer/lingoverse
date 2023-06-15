// pages/event/[id].tsx

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next'; 
import { ParsedUrlQuery } from 'querystring';
import { Database } from '@/lib/database.types'

interface IParams extends ParsedUrlQuery {
  id: string
}

export async function getServerSideProps(context: GetServerSidePropsContext<IParams>) {
  const { id } = context.params!;

  // Fetch event data
  let { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) console.log("Error fetching event: ", error);

  return {
    props: {
      event
    },
  };
}
interface Event {
  id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  zoom_link: string;
  description: string;
  // any other properties your event might have
}

export default function EventPage({ event }: { event: Event }) {
  const router = useRouter();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkRegistration();
  }, []);

  async function checkRegistration() {
    const { user: userFromAuth, session  } = supabase.auth;
    
    if (user) {
      let { data: registration, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('user_id', user.id)
        .eq('event_id', event.id)
        .single();

      if (error) console.log("Error fetching registration: ", error);
      
      setRegistration(registration);
    }
    
    setLoading(false);
  }

  async function registerUser() {
    // handle user registration logic here
    // After registration, recheck the registration status
    checkRegistration();
  }

  const currentTime = new Date().getTime();
  const eventStartTime = new Date(event.start_time).getTime();
  const eventEndTime = new Date(event.end_time).getTime();

  let buttonText, buttonAction, buttonDisabled;

  if (!loading) {
    if (!registration) {
      buttonText = "Register";
      buttonAction = registerUser;
      buttonDisabled = false;
    } else if (currentTime < eventStartTime - 5 * 60 * 1000) {
      buttonText = "Event hasn't started";
      buttonAction = null;
      buttonDisabled = true;
    } else if (currentTime >= eventStartTime - 5 * 60 * 1000 && currentTime <= eventEndTime) {
      buttonText = "Join Event";
      buttonAction = () => router.push(event.location);
      buttonDisabled = false;
    } else {
      buttonText = "Event Ended";
      buttonAction = null;
      buttonDisabled = true;
    }
  }

  return (
    <>
      {/* Display event details here */}
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <button onClick={buttonAction} disabled={buttonDisabled}>
        {loading ? "Loading..." : buttonText}
      </button>
    </>
  );
}
