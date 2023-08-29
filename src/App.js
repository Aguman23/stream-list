import ListPage from "./pages/ListPage/ListPage";
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        {/* <Route path="/warehouse/:id" element={<WareHouseDetailsPage />} />
        <Route path="/warehouse/edit/:id" element={<WareHouseEditPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
