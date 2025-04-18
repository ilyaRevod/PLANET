import React from 'react';
import { X } from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
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

        <h2 className="mb-2 mt-7 text-center text-base sm:text-base md:text-base">
          به پلنت خوش اومدی
        </h2>

        <div className="space-y-2 text-muted-foreground text-center">
          <p className='text-sm sm:text-sm md:text-sm'>این نسخه از پلنت، نسخه آزمایشی
            <span className='text-destructive'>  (بتا)  </span>
            می باشد</p>
{/*           <p className='text-sm sm:text-sm md:text-sm'>قبل از ورود باید به چندتا نکته
            <span className='text-destructive'> توجه </span>
            کنی</p> */}
{/*           <ul className="text-sm sm:text-sm md:text-sm list-inside space-y-2 text-right">
            <li>قبل از انجام انتخاب واحد از صحت آنها در وبسایت اطمینان حاصل کنید، لذا پلنت هیچ مسئولیتی در قبال ناهماهنگی کلاس ها قبول نمیکند</li>
            <li>به تعداد واحد های انتخابی خودتون توجه داشته باشید</li>
            <li>پس از اتمام انتخاب واحد، با کلیک روی گزینه
              <span className='text-[#776BB2]'> دانلود </span>
              میتونید خلاصه ای از واحد های انتخابی تون رو داشته باشید</li>
            <li>" استفاده از این پلتفرم کاملا رایگان میباشد "</li>
          </ul> */}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#776BB2] text-sm sm:text-sm md:text-base text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
        >
          خوندم
        </button>
      </div>
    </div>
  );
};
