import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchPosts = async () => {
    const response = await apiClient.get('/posts');
    return response.data;
};

export const createPost = async (newPost) => {
    const response = await apiClient.post('/posts', newPost);
    return response.data;
};

export const updatePost = async (updatedPost) => {
    const response = await apiClient.put(`/posts/$updatedPost.id`, updatedPost);
    return response.data;
};

export const deletePost = async(postId) => {
    await apiClient.delete(`/posts/${postId}`);
    return postId;
};