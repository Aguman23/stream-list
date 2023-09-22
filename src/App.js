import ListPage from "./pages/ListPage/ListPage";
import PreviewPage from "./pages/PreviewPage/PreviewPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/listpage" element={<ListPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
