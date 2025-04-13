import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AlertPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  showLoginButton?: boolean;
}

export const AlertPopup: React.FC<AlertPopupProps> = ({
  isOpen,
  onClose,
  title,
  message,
  showLoginButton = false
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 font-vazir">
      <div className="bg-card text-card-foreground rounded-2xl shadow-xl p-3 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-2 mt-7 text-center text-base sm:text-lg font-bold">
          {title}
        </h2>

        <div className="space-y-2 text-muted-foreground text-center">
          <p className='text-sm sm:text-sm'>{message}</p>
        </div>

        <div className="mt-4 flex gap-2">
          {showLoginButton && (
            <button
              onClick={() => navigate('/login')}
              className="flex-1 bg-[#776BB2] text-xs sm:text-sm text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              ورود به حساب کاربری
            </button>
          )}
          <button
            onClick={onClose}
            className={`${showLoginButton ? 'flex-1' : 'w-full'} bg-muted text-xs sm:text-sm text-muted-foreground py-2 px-4 rounded-lg hover:bg-muted/80 transition-colors`}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}; 