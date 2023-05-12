import { Text, Spacer } from '@nextui-org/react';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  created_at: Date;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>

        {comments.map((comment) => (
            <div key={comment.id}>
                <Text b color="secondary">{comment.name || 'Anonymous'} said:</Text>
                <Text size={18}>{comment.content}</Text>
                <Text small b>{new Date(comment.created_at).toLocaleString()}</Text>
                <Spacer y={1} />
            </div>
        ))}
    </div>
  );
};
