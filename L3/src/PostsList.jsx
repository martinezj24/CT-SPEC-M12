import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchPosts, deletePost } from './api';
import UpdatePostForm from './UpdatePostForm';

const PostsList = () => {
  const queryClient = useQueryClient();
  const { data: posts, isLoading, error } = useQuery('posts', fetchPosts);

  const deletePostMutation = useMutation(postId => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <UpdatePostForm post={post} />
            <button onClick={() => deletePostMutation.mutate(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
