import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { updatePost } from '../api';
import { Form, Button } from 'react-bootstrap';

const UpdatePostForm = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation(updatedPost => updatePost(updatedPost), {
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries('posts');
      const previousPosts = queryClient.getQueryData('posts');
      
      queryClient.setQueryData('posts', (old) =>
        old.map((p) => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p))
      );

      return { previousPosts };
    },
    onError: (err, updatedPost, context) => {
      queryClient.setQueryData('posts', context.previousPosts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostMutation.mutate({ id: post.id, title, body });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
      </Form.Group>
      <Form.Group controlId="formBody">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter body"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Update Post
      </Button>
    </Form>
  );
};

export default UpdatePostForm;