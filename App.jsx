import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LessonsPage from './pages/LessonsPage';
import QuizPage from './pages/QuizPage';
import CertificatePage from './pages/CertificatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/quiz/:lessonId" element={<QuizPage />} />
        <Route path="/certificate/:certId" element={<CertificatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
