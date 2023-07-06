// meetings/edit-meet.tsx
import type { NextPage } from "next";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Grid, Textarea, Text, Button, Input, Container } from "@nextui-org/react";
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { useState, useEffect } from "react";

const EditMeeting: NextPage<{ user: User }, {}> = ({ user }) => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { id } = router.query;

    const initialState = {
        title: "",
        description: "",
        date: "",
        time: "",
        duration: "",
        zoom_link: "",
    };

    const [meetingData, setMeetingData] = useState(initialState);

    const handleChange = (e: any) => {
        setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
    };

    const updateMeeting = async () => {
        try {
            const { data, error } = await supabaseClient
                .from("meetings")
                .update({
                    title: meetingData.title,
                    description: meetingData.description,
                    date: meetingData.date,
                    time: meetingData.time,
                    duration: meetingData.duration,
                    zoom_link: meetingData.zoom_link,
                    user_id: user?.id
                })
                .match({ id: id as string });

            if (error) throw error;

            router.push("/meetings?id=" + id);

        } catch (error: any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        const fetchMeeting = async () => {
            const { data, error } = await supabaseClient
                .from("meetings")
                .select("*")
                .eq("id", id)
                .single();
        
            if (error) {
                console.log(error);
                return;
            }
        
            if (data) {
                setMeetingData({
                    title: data.title || "",
                    description: data.description || "",
                    date: data.date || "",
                    time: data.time || "",
                    duration: data.duration || "",
                    zoom_link: data.zoom_link || "",
                });
            }
        };
        if (id) {
            fetchMeeting();
        }
    }, [id, supabaseClient]);

    return (
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
                  value={meetingData.title}                                
              />
          </Grid>
          <Grid xs={12}>
              <Textarea
                  name="description"
                  label="Description"
                  aria-label="description"
                  fullWidth={true}
                  rows={6}
                  size="xl"
                  onChange={handleChange}
                  value={meetingData.description}
                  
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
                  value={meetingData.date}
            
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
                  value={meetingData.time}
                  
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
                  value={meetingData.duration}  
                  
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
                  value={meetingData.zoom_link}
                
              />
          </Grid>
          <Grid xs={12}>
              <Text>Editing as {user?.email}</Text>
          </Grid>
          <Button onPress={updateMeeting}>Edit Meeting</Button>
      </Grid.Container>
  </Container>
    )
};

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

export default EditMeeting;
