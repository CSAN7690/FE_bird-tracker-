import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import NewSightingPage from './components/NewSightingPage';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/new-sighting" element={<NewSightingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
