import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home.jsx'
import Header from "./components/Head/Header.jsx";

function App() {
  return (
    <Router>
      <Header></Header>
      <nav>
        <Link to="/Home"></Link>
      </nav>

      <Routes>
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App
