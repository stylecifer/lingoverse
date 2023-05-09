import React from "react";
import { Layout } from "@/layout/layout";
import { Container, Text, Button, Input, Grid, Col } from "@nextui-org/react";
import SideBar from "../components/SideBar";
import SignupForm from "../components/SignupForm";

const SignInSignUp: React.FC = () => {
  return (
    <Layout>
      <Grid.Container>
      <Col span={9}>
        <SignupForm />
      </Col>
      <Col span={3}>
        <SideBar />
      </Col>
    </Grid.Container>
      
    </Layout>
  );
};

export default SignInSignUp;
