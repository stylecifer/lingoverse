// pages/article/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Container, Text, Image, } from '@nextui-org/react';
import articles from '../api/data';
import { Layout } from '@/layout/layout';
import React, { useState } from 'react';
import { CommentForm } from '@/components/CommentForm';

interface ArticleType {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  videoUrl: string;
  content: string;
}
interface ArticleProps {
  article: ArticleType;
 }
interface Params extends ParsedUrlQuery {
  id: string;
}
const getArticleBySlug = async (slug: string): Promise<ArticleType | undefined> => {
  // Replace this with your actual data fetching logic if you're using a real database
  const article = articles.find((a) => a.slug === slug);
  return article;
};
const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <Layout>
      {article ? (
            <Container>
              <Text h1>{article?.title ?? 'Default Title'}</Text>
              {article.videoUrl ? (
                article.videoUrl.includes("youtube.com") ? (
                  <iframe
                    width="100%"
                    height="512"
                    src={article.videoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video width="100%" height="100%" controls>
                    <source src={article.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <Image src={article.coverImage} width="100%" height="auto" />
              )}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
              <CommentForm articleSlug={article.slug} />         
            </Container>
          ) : (
            <Container>
              <Text h1>Article not found</Text>
            </Container>
          )}      
    </Layout>
  );
};
export default Article;
function hasSlug(params: ParsedUrlQuery | undefined): params is { slug: string } {
  return !!params && 'slug' in params;
}
export const getStaticProps: GetStaticProps<ArticleProps> = async (context) => {
  if (!hasSlug(context.params)) {
    return {
      notFound: true,
    };
  }
  const slug = context.params ? context.params.slug : '';
  const article = await getArticleBySlug(slug);
  const defaultArticle = {
    id: '',
    title: '',
    coverImage: '',
    videoUrl: '',
    content: '',
    slug: '',
  };
  return {
    props: {
      article: article || defaultArticle,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};