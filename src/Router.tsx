import LoginPage from 'pages/LoginPage';
import MediaManagementPage from 'pages/MediaManagementPage';
import NotFoundPage from 'pages/NotFoundPage';
import RecordManagementPage from 'pages/RecordManagementPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/record" element={<RecordManagementPage />} />
        <Route path="/media" element={<MediaManagementPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
