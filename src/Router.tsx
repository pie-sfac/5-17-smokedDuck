import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '@/components/Common/Header';
import LoginPage from '@/pages/LoginPage';
import MediaManagementPage from '@/pages/MediaManagementPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RecordManagementPage from '@/pages/RecordManagementPage';

import Footer from './components/Common/Footer';
import CategoryManagementPage from './pages/CategoryManagementPage';

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/record" element={<RecordManagementPage />} />
        <Route path="/media" element={<MediaManagementPage />} />
        <Route path="/category" element={<CategoryManagementPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
