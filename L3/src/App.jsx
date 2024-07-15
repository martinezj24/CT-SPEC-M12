import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostsList from './PostsList';
import CreatePostForm from './forms/CreatePostForm';
import { Container } from 'react-bootstrap';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="my-4">
        <h1>CRUD Operations with React Query</h1>
        <CreatePostForm />
        <PostsList />
      </Container>
    </QueryClientProvider>
  );
};

export default App;