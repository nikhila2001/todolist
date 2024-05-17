import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ShowTodo from './components/ShowTodo';
import CreateTodo from "./components/CreateTodo";
function App() {
  return (
    <div className="App">
    <ShowTodo />
    <CreateTodo />
    </div>
  );
}

export default App;
