import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage/LandingPage';
import InvoicesPage from './pages/InvoicesPage/InvoicesPage';
import {AuthPage} from "./pages/AuthPage";
import AddInvoicePage from "./pages/InvoicesPage/AddInvoice/AddInvoicePage";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/invoices/add" element={<AddInvoicePage />} />
            <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
