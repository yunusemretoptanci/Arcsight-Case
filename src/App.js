import './App.css';
import Tables from './pages/Tables'
import { BrowserRouter,Route, Routes } from "react-router-dom";
import TableUpdate from './pages/TableUpdate';
import AddTable from './pages/AddTable';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="/update" element={<TableUpdate />} />
        <Route path="/addprovider" element={<AddTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
