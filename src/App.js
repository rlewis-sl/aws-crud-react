import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import ListPage from './components/ListPage';
import NewItem from './components/NewItem';
import {createWidget} from './api/widgets';
import './App.css';

export default function App() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/new-widget" element={ <NewItem createItem={createWidget} /> } />
            <Route path="/widgets" element={ <ListPage /> } />
            <Route path="/" element={ <ListPage /> } />
          </Routes>
        </div>
      </Router>
  );
}
