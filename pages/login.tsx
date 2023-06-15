import type { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa  } from '@supabase/auth-ui-shared'
import { Container, Row,  Col, Card, Image } from "@nextui-org/react";

const Login: NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    if (user) {
        router.push("/");
    }
    return (
        <Container gap={0}>
            <Row gap={0}>
                <Col>
                    <Card >
                        <Card.Body> 
                           <Auth 
                            appearance={{theme: ThemeSupa}}
                            supabaseClient={supabaseClient}
                            /> 
                        </Card.Body>    
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Image
                                width="100%"
                                height="100%"  
                                src="/Login.jpg"
                                alt="Default Image"
                                objectFit="cover"
                                />

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}
export default Login;