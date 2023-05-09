import type { NextPage } from 'next';
import { Layout } from '@/layout/layout';
import { Content } from '../components/Content';
// import { AcmeLogo } from './components/AcmeLogo';
// import { SearchIcon } from './components/SearchIcon';

const Home: NextPage = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Home;