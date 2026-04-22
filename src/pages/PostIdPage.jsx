import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostServive from '../API/PostService';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async id => {
    const response = await PostServive.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async id => {
    const response = await PostServive.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Viewing post</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>
            {post?.id}. {post?.title}
          </h2>
          <p>{post?.body}</p>
        </div>
      )}
      <h1>Comments</h1>
      {isComLoading ? (
        <Loader />
      ) : (
        comments.map(comm => (
          <div key={comm.id}>
            <h5>{comm.email}</h5>
            <p>{comm.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostIdPage;
