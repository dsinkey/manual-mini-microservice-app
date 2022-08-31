import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => (
  <div className="container">
    <h1>PostCreate</h1>
    <PostCreate />
    <hr />
    <h1>Post List</h1>
    <PostList />
  </div>
);

export default App;
