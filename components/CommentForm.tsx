import { ChangeEvent, useState } from 'react';
import { Button, Input, Spacer, Textarea } from '@nextui-org/react';
import { CommentResponse } from '@/types';

interface CommentFormProps {
  articleSlug: string;
  onCommentSubmit: (comment: CommentResponse) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ articleSlug, onCommentSubmit }) => {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const newComment = {
      article_slug: articleSlug,
      name,
      email,
      content,
      created_at: new Date(),
    };

    try {
      const res = await fetch('/api/create-comment', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || '😱 Something went wrong');
      }

      console.log('🥳 Comment submitted successfully!');
      onCommentSubmit(newComment as CommentResponse);
    } catch (error: any) {
      console.error('🙀 Error submitting comment:', error.message);
    } finally {
      setName('');
      setEmail('');
      setContent('');
      setIsSubmitting(false);
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
        width="100%"
        required />
      <Spacer y={1} />
      <Textarea
        value={content}
        onChange={handleContentChange as any}
        placeholder="Leave a comment"
        width="100%"
        minRows={4}
        required
      />
      <Spacer y={1} />
      <Button type="submit" color="primary" auto disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
