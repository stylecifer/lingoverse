//comment form componet
import { ChangeEvent, useState } from 'react';
import { Button, Input, Spacer, Textarea } from '@nextui-org/react';
import {supabase} from '@/lib/supabase'

interface CommentFormProps {
  articleSlug: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ articleSlug }) => {
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
    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            article_slug: articleSlug,
            name,
            email,
            content,
            created_at: new Date(),
          },
      ]);

      if (error) {
        throw error;
      }
      console.log('🥳 Comment submitted successfully!');
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