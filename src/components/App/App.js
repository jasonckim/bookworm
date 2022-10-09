import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from '../Search/Search';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () =>{

  return (
    <div className="App">
      <h1>bookworm</h1>
      <Search/>
    </div>
  );
};

export default App;
