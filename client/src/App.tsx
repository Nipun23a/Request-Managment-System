import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { RequestsPage } from './components/pages/RequstsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  




const App: React.FC = () => (
  <Router>
    <ToastContainer position="top-right" autoClose={3000} />
    <Layout>
      <RequestsPage/>
    </Layout>
  </Router>
);

export default App;