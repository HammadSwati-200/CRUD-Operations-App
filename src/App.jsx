import "./App.css";
import ProfilePage from "./components/ProfilePage";
import Table from "./components/Table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="wrapper container pb-2 mt-3 mb-5 p-0 rounded-3 border-3 shadow">
        <Router>
          <h1 className="ps-3 bg-danger py-4 text-light mb-0">CRUD Database</h1>
          <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
