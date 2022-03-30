import './App.css';
import { LibraryItem } from './Components/LibraryItem';
import { Category } from './Components/Category';
import { Employee } from './Components/Employee';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="AppContainer">
        <nav className="navbar">
          <h3>Consid Exercise - Hampus Aronsson</h3>
          <ul>
            <li>
              <NavLink to="/LibraryItem">LibraryItem</NavLink>
            </li>
            <li>
              <NavLink to="/category">Category</NavLink>
            </li>
            <li>
              <NavLink to="/employee">Employee</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/LibraryItem" element={<LibraryItem />} />
          <Route path="/category" element={<Category />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
