// components/Article.tsx
import React from 'react';
import { Container, Text, Image, useTheme, Spacer } from '@nextui-org/react';

interface ArticleProps {
  title: string;
  date: string;
  imageUrl: string;
  content: string;
}

const Article: React.FC<ArticleProps> = ({ title, date, imageUrl, content }) => {
  const theme = useTheme();

  return (
    <Container>
      <Text h2>{title}</Text>
      <Text
        color="secondary"
      >
        {date}
      </Text>
      <Spacer y={1} />
      <Image src={imageUrl} alt={title} />
      <Text>{content}</Text>
    </Container>
  );
};

export default Article;
