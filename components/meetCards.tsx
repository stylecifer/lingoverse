// Create a component  for rendering the list af meetings as a main feed using NextUI library wiht tho card component

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Card, Text } from '@nextui-org/react'
import { Database } from '@/types/supabase'
interface Props {
    meetings: any
}
const MeetingCard: NextPage<Props> = (props) => {
    const router = useRouter()
    const  { meetings }  = props;

    return (
        <Card
            isPressable
            css={{mb: "$10"}}
            onPress={() => router.push("/meetings?id=" + meetings.id)}
            >
                <Card.Body>
                    <Text h2>{meetings.title}</Text>
                    <Text h4>{meetings.date}</Text>
                    <Text h4>{meetings.time}</Text>
                    <Text h4>{meetings.duration}</Text>
                </Card.Body>
        </Card>
    )
}
export default MeetingCard;