import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WelcomeSchedule: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 font-vazir">
      <div className="max-w-md w-full space-y-5 p-8 rounded-lg text-center">
        <h2 className="mt-6 text-xl font-extrabold text-foreground">
          به برنامه هفتگی خوش آمدید
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          برای مشاهده برنامه هفتگی خود، لطفا ابتدا به صفحه ورود بروید
        </p>
        <div className="mt-5">
          <button
            onClick={() => navigate('/login')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-[#776BB2] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            ورود به حساب کاربری
          </button>
        </div>
      </div>
    </div>
  );
}; 