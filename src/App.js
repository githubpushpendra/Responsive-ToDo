import './App.css';
import AddTask from './Pages/AddTask';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodosMain from './Pages/TodosMain'
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {
  return (
    
      <BrowserRouter basename="/Responsive-ToDo">
        <div className='app'>
          <Routes>
            <Route path="/" element={<AddTask />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
