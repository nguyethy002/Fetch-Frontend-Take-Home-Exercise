import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import DogSearch from './DogSearch';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <DogSearch /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
