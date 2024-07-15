import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createPost } from '../api';

const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const queryClient = useQueryClient();

    const createPostMutation = useMutation(newPost => createPost(newPost), {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPostMutation.mutate({ title, body });
        setTitle('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit}>
          <h2>Create New Post</h2>
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
          <button type="submit">Create Post</button>
        </form>
      );
};

export default CreatePostForm