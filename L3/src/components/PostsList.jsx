import React from 'react';
import { useQuery } from 'react-query';
import { fetchPosts } from '../api';


const PostsList = () => {
  const { data: posts, isLoading, error } = useQuery('posts', fetchPosts);

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
                </li>
            ))}
        </ul>
    </div>
  );
};

export default PostsList;