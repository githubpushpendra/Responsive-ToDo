import './App.css';
import AddTask from './Pages/AddTask';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    
      <BrowserRouter>
        <div className='app'>
        <Routes>
            <Route path="/" element={<AddTask />} />
          </Routes>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
