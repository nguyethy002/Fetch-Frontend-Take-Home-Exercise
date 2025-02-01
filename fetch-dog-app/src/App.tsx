import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import DogSearch from './components/DogSearch';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', width: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <DogSearch /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
