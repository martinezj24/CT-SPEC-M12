import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updatePost } from '../api';


const UpdatePostForm = ({ post }) => {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const queryClient = useQueryClient();
  
    const updatePostMutation = useMutation(updatedPost => updatePost(updatedPost), {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      updatePostMutation.mutate({ id: post.id, title, body });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Update Post</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          required
        />
        <button type="submit">Update Post</button>
      </form>
    );
  };
  
  export default UpdatePostForm;