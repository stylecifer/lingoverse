import type { NextPage } from 'next';
import { Layout } from '@/layout/layout';
import { Content } from '../components/Content';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from "@/components/Account"
// import { AcmeLogo } from './components/AcmeLogo';
// import { SearchIcon } from './components/SearchIcon';

const Home: NextPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  return (
    <Layout>
      {!session ? (
        <Content />
      ) : ( 
        <Account session={session}/>
      )}
    </Layout>
  );
};

export default Home;