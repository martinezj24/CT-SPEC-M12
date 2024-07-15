import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchPosts, deletePost } from './api';
import UpdatePostForm from './forms/UpdatePostForm';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

const PostsList = () => {
  const queryClient = useQueryClient();
  const { data: posts, isLoading, error } = useQuery('posts', fetchPosts);

  const deletePostMutation = useMutation(postId => deletePost(postId), {
    onMutate: async (postId) => {
      await queryClient.cancelQueries('posts');
      const previousPosts = queryClient.getQueryData('posts');
      
      queryClient.setQueryData('posts', (old) =>
        old.filter(post => post.id !== postId)
      );

      return { previousPosts };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData('posts', context.previousPosts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error fetching posts</Alert>;

  return (
    <Container>
      <h2>Posts</h2>
      <Row>
        {posts.map(post => (
          <Col key={post.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <UpdatePostForm post={post} />
                <Button variant="danger" onClick={() => deletePostMutation.mutate(post.id)} className="mt-3">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostsList;