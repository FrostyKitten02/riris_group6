import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage/LandingPage';
import InvoicesPage from './pages/InvoicesPage/InvoicesPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
