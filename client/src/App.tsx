import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/organisms/Header';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Your other components and routes go here */}
      </div>
    </Router>
  );
};

export default App;
