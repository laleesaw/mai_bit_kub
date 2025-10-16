
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Head/Header.jsx";
import Home from "./pages/Home.jsx";
import Main_page from "./pages/main_page.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main_page" element={<Main_page />} />
      </Routes>
    </Router>
  );
}

export default App;
