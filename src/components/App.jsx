import { Route, Routes } from 'react-router-dom';

import Layout from '../pages/home/Layout';
import Generate from '../pages/generate/Generate';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/generate" element={<Generate />} />
    </Routes>
  );
}
