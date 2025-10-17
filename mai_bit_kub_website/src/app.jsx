import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Head/Header.jsx";
import Home from "./pages/Home.jsx";
import Main_page from "./pages/main_page.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
        <Route
          path="/main_page"
          element={
            <ProtectedRoute>
              <Main_page />
            </ProtectedRoute>
          }
        />
=======
        <Route path="/main_page" element={<Main_page />} />
>>>>>>> 153c70e98a9e9b7819a23ddd33c6a475b926bdad
      </Routes>
    </Router>
  );
}

export default App;
