import './styles/reset.scss';
import './styles/defaults.scss';
import './styles/metrics.scss';
import './styles/palette.scss';
import './styles/shadows.scss';
import './styles/typography.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </>
);

export default App;
