// pages/article/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Container, Text, Image, Spacer} from '@nextui-org/react'; 
import { Box } from "@/components/Box";
import articles from '@/pages/api/data';
import { Layout } from '@/layout/layout';
import React, { useState, useEffect } from 'react';
import { CommentList } from '@/components/CommentList';
import { CommentForm } from '@/components/CommentForm';
import { CommentResponse as  Comment  } from '@/types'

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

  const article = articles.find((a) => a.slug === slug);
  return article;
};
const Article: React.FC<ArticleProps> = ({ article }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, [article.slug]);

  const fetchComments = async () => {
    const res = await fetch(`/api/fetch-comments?article_slug=${article.slug}`)
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message)
    }
    setComments(data as Comment[]);
  };

  const handleNewComment = async (comment: Comment) => {
    // Create a new array with the new comment at the start
    const updatedComments = [comment, ...comments];
    // Update the state with the new array
    setComments(updatedComments);
    console.log(updatedComments);
};
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
              <Spacer y={2} />
              {/* add the content tha came from the api */} 
              <Box style={{maxWidth: "800px", fontSize: '18px', margin: "auto"}}>
                    <style>
                            {`
                              .content p {
                                font-size: 23px;
                              }
                            `}
                    </style>
                <div className='content' dangerouslySetInnerHTML={{ __html: article.content }} />
                
                <Spacer y={2} />
                <Text h3>Leave a comment</Text> 
                <Text 
                      size={18} 
                      b 
                      css={{
                            textGradient: "45deg, $yellow600 -20%, $red600 100%",
                          }}>The Lingoverse will know your name </Text>
                <span>  😉  </span>
                
                <Spacer y={2} />
                <CommentForm
                  articleSlug={article.slug}
                  onCommentSubmit={handleNewComment} />
                  <Spacer y={2} />
                <CommentList comments={comments}  />
                <Spacer y={2} />
              </Box>
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