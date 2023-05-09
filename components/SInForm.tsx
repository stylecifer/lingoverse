// components/SignInForm.tsx
import React from "react";
import { Button, Input, Grid, Text } from "@nextui-org/react";

const SignInForm: React.FC = () => {
  return (
    <Grid.Container gap={2} direction="column">
        <Text h3>Sign In</Text>

      <Grid>
        <Input labelPlaceholder="Email" />
      </Grid>
      <Grid>
        <Input.Password labelPlaceholder="Password" />
      </Grid>
      <Grid>
        <Button color="primary" style={{ width: "40%" }}>
          Sign In
        </Button>
      </Grid>
    </Grid.Container>
  );
};

export default SignInForm;
