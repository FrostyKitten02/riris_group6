import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<NavBar />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
