import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Header from "./components/Head/Header.jsx";
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Main_page from './pages/main_page.jsx'



function App() {
  return (
    <Router>
      <Header></Header>
      <nav>
        <Link to="/Home"></Link>
        <Link to="/SignIn"></Link>
        <Link to="/SignUp"></Link>
        <Link to="/Main_page"></Link>
        

      </nav>

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Main_page" element={<Main_page />} />



      </Routes>
    </Router>
  );
}

export default App
