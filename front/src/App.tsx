import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticalIconNavbar from './Component/VerticalIconNavbar';
import HomePage from './Pages/HomePage';
import PublishPropertyPage from './Pages/PublishPropertyPage';
import SearchPage from './Pages/SearchPage';
import MatchingProfilePage from './Pages/MatchingProfilePage';
import SettingsPage from './Pages/SettingsPage';
import PropertyDetails from './Pages/PropertyDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-row h-screen overflow-hidden">
        <VerticalIconNavbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publish" element={<PublishPropertyPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/matching" element={<MatchingProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;