import type { NextPage } from 'next';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Text } from '@nextui-org/react';
import MeetingCard from '@/components/meetCards';

const MeetsFeed: NextPage = () => { 
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [meets, setMeets] = useState<any[]>([]);

    useEffect(() => {
        getMeets();
    }, []);

    const getMeets = async () => {
        try {
            const { data, error } = await supabaseClient
                .from("meetings")
                .select("*")
                .limit(10) // investigate what paginotion is!!!
            console.log(data);
            if (data != null) {
                setMeets(data);
            }
        } catch (error: any) {
            alert(error.messege);
        }
    }
    return (
        <>
            <Text h2>Main Feed</Text>
            <Text size="$lg" css={{my: "$8"}}>
                Check out articles from users here
            </Text>
            {meets.map((meetings) => (
                <MeetingCard key={meetings.id} meetings={meetings} />
            ))}
            </>
    )

}
export default MeetsFeed;