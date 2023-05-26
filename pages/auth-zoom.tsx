import { NextPage } from 'next';
import { Text, Spacer } from "@nextui-org/react";
import { useRouter } from 'next/router';

const AuthZoom: NextPage = () => {
    const router = useRouter();
    const connectZoom = () => {
      window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
    }  
    return (
        <>
            <Text h2>The future of article sharing</Text>
            <Spacer y={1}></Spacer>
            <Text size="$lg">
            ShareArticles allows you to create and share articles.
            </Text>
            <button onClick={connectZoom}>
                Connect Zoom
            </button>
        </>
    )
}

export default AuthZoom;