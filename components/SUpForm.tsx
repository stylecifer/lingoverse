// components/SignUpForm.tsx
import React from "react";
import { Button, Input, Grid, Text } from "@nextui-org/react";

const SignUpForm: React.FC = () => {
  return (
    <Grid.Container gap={2} direction="column">
        <Text h3 >Sign Up</Text>
      <Grid>
        <Input labelPlaceholder="Name" />
      </Grid>
      <Grid>
        <Input labelPlaceholder="Email" />
      </Grid>
      <Grid>
        <Input.Password labelPlaceholder="Password" />
      </Grid>
      <Grid>
        <Button color="secondary" style={{ width: "40%" }}>
          Sign Up
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default SignUpForm;
