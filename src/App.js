import React, { useMemo, useState, useRef, useEffect } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostServive from './API/PostService';
import Loader from './components/UI/loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoadig, postError] = useFetching(async () => {
    const response = await PostServive.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const createPost = newPost => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  //Отримуємо post з дочірнього компоненту
  const removePost = post => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const chagePage = page => {
    setPage(page);
    fetchPosts();
  };

  return (
    <div className='App'>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Something went wrong ${postError}</h1>}
      {isPostsLoadig ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title='Posts about JavaScript'
        />
      )}
      <div className='page__wrapper'>
        {pagesArray.map(p => (
          <span
            key={p}
            onClick={() => chagePage(p)}
            className={page === p ? 'page page__current' : 'page'}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
