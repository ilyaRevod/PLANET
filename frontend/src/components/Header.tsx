import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'خانه' },
    // { path: '/schedule-vahed', label: 'انتخاب واحد' },
    { path: '/schedule', label: 'برنامه' },
    { path: '/about-me', label: 'درباره من' },
    { path: '/about-project', label: 'پلنت چیه؟' },
    { path: '/login', label: 'ورود' },
  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50",
      "font-vazir",
      "transition-colors duration-300"
    )}>
      <div className="container mx-auto flex justify-between items-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-foreground cursor-default">PLANET</h1>

        <nav className="hidden lg:flex items-center gap-6">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "text-foreground hover:text-[#776BB2]",
                location.pathname === item.path && "text-[#776BB2]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-muted"
          >
            {isDarkMode ? <Sun className="text-foreground" /> : <Moon className="text-foreground" />}
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        "fixed inset-0 bg-background/70 backdrop-blur-2xl z-50 transition-transform duration-300",
        "flex flex-col p-8 text-right",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4"
        >
          <X className="h-6 w-6 text-foreground" />
        </button>

        <nav className="mt-12">
          <ul className="space-y-6">
            {menuItems.map(item => (
              <li key={item.path} className='border-b border-border pb-2'>
                <Link
                  to={item.path}
                  className="text-xl text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};