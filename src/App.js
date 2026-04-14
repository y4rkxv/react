import React, { useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description' },
    { id: 2, title: 'Javascript 2', body: 'Description' },
    { id: 3, title: 'Javascript 3', body: 'Description' },
  ]);

  return (
    <div className='App'>
      <form>
        <input type='text' placeholder='post title'></input>
        <input type='text' placeholder='post description'></input>
        <MyButton disabled={true}>create a post</MyButton>
      </form>
      <PostList posts={posts} title='Posts about JavaScript' />
    </div>
  );
}

export default App;
