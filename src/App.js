import ListPage from "./pages/ListPage/ListPage";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
