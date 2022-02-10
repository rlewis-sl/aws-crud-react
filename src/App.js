import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import NewItemPage from './components/NewItemPage';
import ItemPage from './components/ItemPage';
import ListPage from './components/ListPage';
import './App.css';

export default function App() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/new-widget" element={ <NewItemPage /> } />
            <Route path="/widgets/:widgetId" element={ <ItemPage /> } />
            <Route path="/widgets" element={ <ListPage /> } />
            <Route path="/" element={ <ListPage /> } />
            <Route path="*" element={ <ListPage /> } />
          </Routes>
        </div>
      </Router>
  );
}
