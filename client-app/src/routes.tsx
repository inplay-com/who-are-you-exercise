// src/routes/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerList from './components/PlayerList';
import TeamList from './components/TeamList';
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/players" element={<PlayerList />} />
        <Route path="/teams" element={<TeamList />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
