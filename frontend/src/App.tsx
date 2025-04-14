import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Footer from './components/Footer';
import TimeTable from './components/TimeTable';
import { Login } from './pages/Login';
import Home from './pages/Home';
import { AboutMe } from './pages/About-me';
import AboutProject from './pages/About-project';
import { WelcomePopup } from './components/WelcomePopup';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    // Check if we should show the popup
    const lastShown = localStorage.getItem('welcomePopupLastShown');
    const now = Date.now();

    if (!lastShown || (now - parseInt(lastShown)) > 5 * 60 * 1000) { // 5 minutes in milliseconds
      setShowWelcomePopup(true);
      localStorage.setItem('welcomePopupLastShown', now.toString());
    }
  }, []);

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        <div className="flex-1">
          <WelcomePopup isOpen={showWelcomePopup} onClose={handleCloseWelcomePopup} />
          <main className="h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about-project" element={<AboutProject />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/home" element={<Home />} />
              <Route path="/schedule" element={<TimeTable />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
