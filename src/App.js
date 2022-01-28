import ItemList from './components/ItemList';
import {getWidgetsAsync} from './api/widgets';
import './App.css';

async function getWidgets() {
  try {
    return getWidgetsAsync();
  } catch (e) {
    console.log(e);
    return [];
  }
}

function App() {
    return (
    <div className="App">
      <ItemList getItems={getWidgets}/>
    </div>
  );
}

export default App;
