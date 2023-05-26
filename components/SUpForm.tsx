// components/SignUpForm.tsx
import { Button, Input, Grid, Text } from "@nextui-org/react";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else if (data) {
      setMessage('Check your email for the confirmation link!');
    }
  };

  return (
    // I did this <Grid.Container as a form. Is there a way to pass it the handleSubmit fuction to it?
    <form onSubmit={handleSubmit}>
    <Grid.Container gap={2} direction="column">
        <Text h3 >Sign Up</Text>
      <Grid>
        <Input 
          labelPlaceholder="Name"
          />
      </Grid>
      <Grid>
        <Input 
          labelPlaceholder="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
      </Grid>
      <Grid>
        <Input.Password 
          labelPlaceholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
      </Grid>
      <Grid>
        <Button 
          type="submit"
          color="secondary"
          disabled={loading} 
          style={{ width: "40%" }}>
            {loading ? 'Loading...' : 'Sign Up'}
          
        </Button>
        {message && <p>{message}</p>}
      </Grid>
    </Grid.Container>
    </form>
  );
};

export default SignUpForm;
