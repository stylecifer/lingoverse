import type { NextPage } from "next";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Grid, Textarea, Text, Button, Input, Container } from "@nextui-org/react";
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { useState } from "react";

const CreateMeeting: NextPage<{ user: User }, {}> = ({ user }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const initialState = {
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    zoom_link: "",
  }
  const [meetingData, setMeetingData] = useState(initialState);
  const handleChange = (e: any) => {
    setMeetingData({...meetingData, [e.target.name] : e.target.value })
  }
  const createMeeting = async () => {
    try {
      const { data, error } = await supabaseClient
      .from("meetings")
      .insert([
        {
          title: meetingData.title,
          description: meetingData.description,
          date: meetingData.date,
          time: meetingData.time,
          duration: meetingData.duration,
          zoom_link: meetingData.zoom_link,
          user_id: user?.id
        }
      ])
      .single();
      if (error) throw error;
      setMeetingData(initialState);
      router.push("/meetings/all-meets");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return(
  <Container>
      <Grid.Container gap={1}>

          <Grid xs={12}>
              <Textarea
                  name="title"
                  label="Title"
                  aria-label="title"
                  placeholder="Article Title"
                  fullWidth={true}
                  rows={1}
                  size="xl"
                  onChange={handleChange}
              />
          </Grid>
          <Grid xs={12}>
              <Textarea
                  name="description"
                  label="Description"
                  aria-label="description"
                  placeholder="Meeting Description"
                  fullWidth={true}
                  rows={6}
                  size="xl"
                  onChange={handleChange}
              />
          </Grid>
          <Grid xs={6}>
              <Input
                  name="date"
                  aria-label="date"
                  placeholder="Meeting Date"
                  label="Date" 
                  type="date"
                  fullWidth={true}
                  size="xl"
                  onChange={handleChange}
              />            
          </Grid>
          <Grid xs={6}>
              <Input
                  name="time"
                  aria-label="time"
                  placeholder="Meeting Time"
                  label="Time"
                  type="time"
                  fullWidth={true}
                  size="xl"
                  onChange={handleChange}
                  />
          </Grid>
          <Grid xs={12}>
              <Input 
                  name="duration"
                  aria-label="duration"
                  placeholder="In Minutes Please"
                  label="Duration"
                  type="number"
                  fullWidth={true}
                  size="xl"
                  onChange={handleChange}
              />
          </Grid>
          <Grid xs={12}>
              <Input
                  name="zoom_link"
                  aria-label="zoom_link"
                  placeholder="Zoom Link"
                  label="URL"
                  type="url"
                  fullWidth={true}
                  size="xl"
                  onChange={handleChange}
              />
          </Grid>
          <Grid xs={12}>
              <Text>Created as {user?.email}</Text>
          </Grid>
          <Button onPress={createMeeting}>Create Meeting</Button>
      </Grid.Container>
  </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
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

export default CreateMeeting;
