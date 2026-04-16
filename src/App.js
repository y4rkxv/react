import React, { useState, useRef } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description' },
    { id: 2, title: 'Javascript 2', body: 'Description' },
    { id: 3, title: 'Javascript 3', body: 'Description' },
  ]);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNewPost = e => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    setPosts([...posts, newPost]);
  };
  return (
    <div className='App'>
      <form>
        {/*керований компонент*/}
        <MyInput
          value={title}
          onChange={e => setTitle(e.target.value)}
          type='text'
          placeholder='post title'
        ></MyInput>
        {/* не керований компонент*/}
        <MyInput
          value={body}
          onChange={e => setBody(e.target.value)}
          type='text'
          placeholder='post description'
        ></MyInput>
        <MyButton onClick={addNewPost}>create a post</MyButton>
      </form>
      <PostList posts={posts} title='Posts about JavaScript' />
    </div>
  );
}

export default App;
