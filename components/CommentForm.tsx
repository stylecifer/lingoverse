//comment form componet
import { ChangeEvent, useState } from 'react';
import { Button, Input, Spacer, Textarea } from '@nextui-org/react';
import {supabase} from '@/lib/supabase'

interface CommentResponse {
  id: string;
  article_slug: string;
  name: string;
  email: string;
  content: string;
  created_at: Date;
}
interface CommentFormProps {
  articleSlug: string;
  onCommentSubmit: (comment: CommentResponse) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ articleSlug, onCommentSubmit }) => {
  const [content, setContent] = useState('');
  //let's add two fields for name optional and email required
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('🧐 Submitting comment...');

    const newComment = {
      article_slug: articleSlug,
      name,
      email,
      content,
      created_at: new Date(),
    }
    try {
      const { error } = await supabase
        .from('comments')
        .insert([newComment]);
      if (error) {
        throw error;
      }

 const { data: commentData, error: fetchError } = await supabase
      .from('comments')
      .select('*')
      .eq('article_slug', articleSlug)
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError || !commentData || commentData.length === 0) {
      throw fetchError || new Error('😭 No data returned from Supabase');
    }

    const fetchedComment = commentData[0];
    if (!fetchedComment.id) {
      throw new Error('⛔ Fetched comment has no ID ');
    }

    console.log('🥳 Comment submitted successfully!');
    onCommentSubmit(fetchedComment as CommentResponse);
    setName('');
    setEmail('');
    setContent('');
  } catch (error: any) {
    console.error('🙀 Error submitting comment:', error.message);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={handleNameChange as any}
        placeholder="Your name (optional)"
        width="100%" /> 
      <Spacer y={1} />
      <Input
        value={email}
        onChange={handleEmailChange as any}
        placeholder="Your email (required)"
        width="100%" />
        <Spacer y={1} />
      <Textarea
        value={content}
        onChange={handleContentChange as any}
        placeholder="Leave a comment"
        width="100%"
        minRows={4}
      />
      <Spacer y={1} />
      <Button type="submit" color="primary" auto>
        Submit
      </Button>
    </form>
  );
};