//Let's create the Meeting Page
import { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Text, Spacer, User, Button } from "@nextui-org/react";
import Countdown from "react-countdown";

const MeetPage: NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [meet, setMeet] = useState<any>({});//This is <any> because I don't know the type of the meet object yet
    const { id } = router.query;
// useEffect run inicially and ID is going to by undefined. When the ID chonges because is in our dependency array, then usuEffect is going to run again. That's why the if condition is right there "if (typeof id !== "undefined")"
    useEffect(() => {
        async function getMeet() {
            const { data, error } = await supabaseClient
                .from("meetings")
                .select("*")
                .filter("id","eq", id)
                .single();
            if (error) {
                console.log(error);
            } else { setMeet(data); }
        }
        if (typeof id !== "undefined") { // This is because the id is going to be undefined inicially.
            getMeet();
        }
    }, [id, supabaseClient])

    const deleteMeet = async () => {
        try {
            const { error } = await supabaseClient
                .from("meetings")
                .delete()
                .eq("id", id);
            if (error) throw error;
            router.push("/meetings/all-meets");
        } catch (error: any ) {
            alert(error.message);
        } 
    };


    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [registrationTime, setRegistrationTime] = useState<Date | null>(null);
    useEffect(() => {
        async function checkRegistration() {
            const { data, error } = await supabaseClient
                .from("attendees")
                .select("*")
                .eq("user_id", user?.id)
                .eq("meeting_id", id)
                .single();
            if (error) {
                console.log(error);
            
            } else {
                setIsRegistered(!!data);
                setRegistrationTime(data?.joined_at);
            }
        }
        if (user && typeof id !== "undefined") {
            checkRegistration();
        }
    }, [user, id, supabaseClient]);

    const handleRegister = async () => {
        if (!user ){
            router.push("/login");
            return;
        }
        try {
            const { error } = await supabaseClient
            .from("attendees")
            .insert([
                { meeting_id: id, user_id: user.id , joined_at: new Date()  }
            ])
        if (error) throw error;

            setIsRegistered(true);
            setRegistrationTime(new Date());
        } catch (error: any) {
            alert(error.message);
        }
    }
    const renderButton = () => {
        if (isRegistered) {
            const meetingTime = new Date(`${meet.date}T${meet.time}`);
            return (
                <Countdown
                    date={meetingTime}
                    renderer={({ hours, minutes, seconds, completed }) => {
                        if (completed) {
                            // Render a completed state
                            return <Button color="gradient" size="lg">Launch Meeting</Button>;
                        } else {
                            // Render a countdown
                            return <span>{hours}:{minutes}:{seconds} until meeting starts</span>;
                        }
                    }}
                />
            );
            
        } else {
            return <Button color="gradient" size="lg" onClick={handleRegister}>Register</Button>;
        }}
    
    return ( 
        <>
            <Text h1>{meet.title}</Text>
            <Spacer y={.5} />
            <User name={meet.auth?.users[0]?.email?.toLowerCase()} size="md" />
            <Spacer y={.5} />
            <Text>{meet.date} | {meet.time} </Text>
            <Spacer y={.5}/>
            <Text>{meet.description}</Text>
            <Spacer y={.5} />
            {renderButton()}

            <Spacer y={1} />

       { user && meet.user_id === user.id ?
            <>
                <Button
                    color="warning"
                    size="xs"
                    onPress={() => router.push("/meetings/edit-meet?id=" + id)}>
                    Edit Meet </Button>
                <Button
                    color="error"
                    size="xs"
                    onPress={() => deleteMeet()}>
                        Delete Meet </Button>
            </>
        : null }            
        </>
     );
}
export default MeetPage;