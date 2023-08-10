import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '@/components/Common/Header';
import LoginPage from '@/pages/LoginPage';
import MediaManagementPage from '@/pages/MediaManagementPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RecordManagementPage from '@/pages/RecordManagementPage';

import CategoryManagementPage from './pages/CategoryManagementPage';
import { MediaProvider } from './store/MediaProvider';
import { RecordProvider } from './store/RecordProvider';
import { TemplateProvider } from './store/TemplateProvider';

export default function AppRouter() {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL as string;
  return (
    <TemplateProvider>
      <RecordProvider>
        <MediaProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/record" element={<RecordManagementPage />} />
              <Route path="/media" element={<MediaManagementPage />} />
              <Route path="/category" element={<CategoryManagementPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </MediaProvider>
      </RecordProvider>
    </TemplateProvider>
  );
}
