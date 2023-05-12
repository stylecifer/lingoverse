// pages/article/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Container, Text, Image, Spacer} from '@nextui-org/react';
import articles from '../api/data';
import { Layout } from '@/layout/layout';
import React, { useState, useEffect } from 'react';
import { CommentList } from '@/components/CommentList';
import { supabase } from '@/lib/supabase';
import { CommentForm } from '@/components/CommentForm';
 
interface Comment { 
  id: string;
  article_slug: string;
  name: string;
  email: string;
  content: string;
  created_at: Date;
}
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
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, [article.slug]);

  const fetchComments = async () => {
    const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('article_slug', article.slug)
    .order('created_at', { ascending: false });

    if (error) {
      console.error('🙀 Error fetching comments:', error.message);
    } else {
      setComments(data as Comment[]);
    }
  };

  const handleNewComment = async (comment: Comment) => {
    // Create a new array with the new comment at the start
    const updatedComments = [comment, ...comments];
    // Update the state with the new array
    setComments(updatedComments);
    console.log(updatedComments);
    const {error}= await supabase
      .from('comments')
      .insert([{
        article_slug: article.slug,
        content: comment.content,
        name: comment.name,
        email: comment.email,}
      ]);
      if (error) {
        console.error('🤦🏻‍♂️ Error inserting comment:', error.message);
        // Revent to previous state if there's an error
 }};
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
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
              <Spacer y={2} />
              <Text h3>Leave a comment</Text> 
              <Text size={18} b css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}>The Lingoverse will know your name</Text><span>  😉  </span>
              
              <Spacer y={2} />
              <CommentForm
                articleSlug={article.slug}
                onCommentSubmit={handleNewComment} />
                <Spacer y={2} />
              <CommentList comments={comments}  />
              <Spacer y={2} />
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