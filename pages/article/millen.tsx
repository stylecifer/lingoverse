// pages/article.tsx
import { Layout } from '@/layout/layout';
import { Col, Grid } from '@nextui-org/react';
import Article from '../../components/Article';
import SideBar from '../../components/SideBar';

const ArticlePage: React.FC = () => {
  // Replace this data with actual data from your API or content source
  const articleData = {
    title: 'Online Meeting Review: Session #1',
    date: '2023-04-22',
    imageUrl: 'https://example.com/image-url.jpg',
    content:
      'In this online meeting, we practiced English by discussing various topics. We focused on pronunciation, vocabulary, and conversation skills. Participants had the opportunity to practice speaking in small groups and received feedback from the session facilitator.',
  };

  return (
    <Layout>      
      <Grid.Container>
      <Col span={9}>
        <Article
        title={articleData.title}
        date={articleData.date}
        imageUrl={articleData.imageUrl}
        content={articleData.content}
      />
      </Col>
      <Col span={3}>
        <SideBar />
      </Col>
    </Grid.Container>
    </Layout>
  );
};

export default ArticlePage;