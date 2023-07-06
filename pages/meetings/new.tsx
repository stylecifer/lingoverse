//Let's create a new page for creating meetings or events based on the Supabase schema imported from /types/supabase

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Input, Button, Grid } from '@nextui-org/react'

interface NewMeetingFormData {
    event_name: string;
    start_time: string;
    end_time: string;
    event_description: string;
    zoom_link: string;
}
export default function NewMeetingPage() {
    const [formData, setFormData] = useState<NewMeetingFormData>({
        event_name: '',
        start_time: '',
        end_time: '',
        event_description: '',
        zoom_link: ''
    })
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { event_name, start_time, end_time, event_description, zoom_link } = formData
        const { data, error } = await supabase
            .from('events')
            .insert([{ event_name, start_time, end_time, event_description, zoom_link }])
            if (error) {
                console.error("Error adding new event: ", error);
              } else {
                console.log("New event added successfully: ", data);
              }
    }
    return (
        //create the necesary form fields for the new meeting using NextUI library

        <form onSubmit={handleSubmit}>
            <Grid.Container gap={3} direction="column" alignItems="center">    
            <Grid>
                <Input
                labelPlaceholder="Meeting Name"
                    type="text"
                    name="event_name"
                    value={formData.event_name}
                    onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                    required
                />
            </Grid>
            <Grid>
                <Input
                    labelPlaceholder="Star Time:"
                    type="datetime-local"
                    name="start_time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    required
                    />
            </Grid>
            <Grid>
                <Input
                    labelPlaceholder="End Time:"
                    type="datetime-local"
                    name="end_time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    required
                    />
            </Grid>
            <Grid>
                <Input
                labelPlaceholder="Meeting Description:"
                type="text"
                name="event_description"
                value={formData.event_description}
                onChange={(e) => setFormData({ ...formData, event_description: e.target.value })}
                />
            </Grid>
            <Grid>
                <Input
                labelPlaceholder="Zoom Link:"
                type="url"
                name="zoom_link"
                value={formData.zoom_link}
                onChange={(e) => setFormData({ ...formData, zoom_link: e.target.value })}
                />
            </Grid>
            <Button type="submit">Add Event</Button>
            </Grid.Container>
        </form>
  );
}