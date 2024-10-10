import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { RequestsPage } from './components/pages/RequstsPage';

// Import other pages...

const App: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/requests" element={<RequestsPage />} />
        {/* Add other routes... */}
      </Routes>
    </Layout>
  </Router>
);

export default App;