import React from 'react';
import { clsx } from 'clsx';

const Footer: React.FC = () => {
  return (
    <footer className={clsx(
      "w-full py-3",
      "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "border-t border-border",
      "font-vazir",
      "transition-colors duration-300"
    )}>
      <div className="container mx-auto px-4">
        <p className="text-xs text-foreground text-center">
          © 2025 PLANET - Version 0.80 | تمامی حقوق محفوظ است
        </p>
      </div>
    </footer>
  );
};

export default Footer; 