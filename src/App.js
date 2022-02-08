import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import ItemList from './components/ItemList';
import NewItem from './components/NewItem';
import {createWidget, getWidgetsAsync} from './api/widgets';
import './App.css';

async function getWidgets() {
  try {
    return getWidgetsAsync();
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default function App() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/new-widget" element={ <NewItem createItem={createWidget} /> } />
            <Route path="/widgets" element={ <Link to="/new-widget">Create Widget</Link> } />
            <Route path="/" element={ <ItemList getItems={getWidgets} /> } />
          </Routes>
        </div>
      </Router>
  );
}
