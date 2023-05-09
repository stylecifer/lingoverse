import { Container, Text, Grid, Col } from "@nextui-org/react";
import SignInForm from "./SInForm";
import SignUpForm from "./SUpForm";

const SignInSignUp: React.FC = () => {
    const containerStyle = {
        alignItems:'end',
    }
  return (
    
    
        
          <Container>
            
            <Grid.Container gap={2} style={containerStyle}>
              <Grid xs={12} sm={12} lg={6}>
                <SignInForm />
              </Grid>
              <Grid xs={24} sm={12} lg={6}>
                <SignUpForm />
              </Grid>
            </Grid.Container>
          </Container>
       
     

  );
};

export default SignInSignUp;