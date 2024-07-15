import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createPost } from '../api';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation(newPost => createPost(newPost), {
    onMutate: async (newPost) => {
      await queryClient.cancelQueries('posts');
      const previousPosts = queryClient.getQueryData('posts');
      queryClient.setQueryData('posts', (old) => [...old, { ...newPost, id: Date.now() }]);
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData('posts', context.previousPosts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setSuccess(true);
      setTitle('');
      setBody('');
      setTimeout(() => setSuccess(false), 3000); // Hide message after 3 seconds
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({ title, body });
  };

  return (
    <Container className="my-4">
      <h2>Create New Post</h2>
      {success && <Alert variant="success">Post created successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
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
          Create Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePostForm;