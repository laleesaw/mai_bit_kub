import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from "./components/Head/Header.jsx";
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'


function App() {
  return (
    <Router>
      <Header></Header>
      <nav>
        <Link to="/Home"></Link>
        <Link to="/SignIn"></Link>
        <Link to="/SignUp"></Link>

      </nav>

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />


      </Routes>
    </Router>
  );
}

export default App
