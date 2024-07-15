import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostsList from './PostsList';
import CreatePostForm from './CreatePostForm';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>CRUD Operations with React Query</h1>
        <CreatePostForm />
        <PostsList />
      </div>
    </QueryClientProvider>
  );
};

export default App;