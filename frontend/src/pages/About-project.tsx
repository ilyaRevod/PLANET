import React from 'react';
import projectImage from '../public/images/PLANET(4).jpg';
import { FaCheck } from 'react-icons/fa';

const AboutProject: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-42px)] bg-background text-foreground pt-16 text-right font-vazir transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
            <div className="w-full md:w-2/3">
              <div className="relative">
                <img
                  src={projectImage}
                  alt="تصویر پلنت"
                  className="w-full h-auto rounded-2xl shadow-lg object-cover transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-right">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-4">
                پلنت چیست؟
              </h1>
              <p className="text-sm sm:text-sm md:text-base text-muted-foreground mb-2 sm:mb-7">
                مدیریت هوشمند برنامه درسی دانشجویان
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-lg mb-6 transition-colors duration-300">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-6">
              درباره پلنت
            </h2>
            <div className="prose max-w-none">
              <p className="text-sm sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-2 sm:mb-6">
                پلنت یک پلتفرم مدیریت برنامه‌ی درسی هوشمند است که به دانشجویان کمک می‌کند تا برنامه‌ی درسی خود را به بهترین شکل ممکن مدیریت کنند
              </p>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-4">
                با استفاده از پلنت، می‌توانید
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm">
                <li className="flex flex-row-reverse items-center gap-2">
                  <FaCheck className="text-[#776BB2] flex-shrink-0" />
                  <span className="text-right flex-1">برنامه‌ی درسی خود را به صورت هفتگی مشاهده و مدیریت کنید</span>
                </li>
                <li className="flex flex-row-reverse items-center gap-2">
                  <FaCheck className="text-[#776BB2] flex-shrink-0" />
                  <span className="text-right flex-1">از تداخل‌های زمانی کلاس‌ها جلوگیری کنید</span>
                </li>
                <li className="flex flex-row-reverse items-center gap-2">
                  <FaCheck className="text-[#776BB2] flex-shrink-0" />
                  <span className="text-right flex-1">برنامه‌ی خود را با دوستانتان به اشتراک بگذارید</span>
                </li>
                <li className="flex flex-row-reverse items-center gap-2">
                  <FaCheck className="text-[#776BB2] flex-shrink-0" />
                  <span className="text-right flex-1">در انتخاب واحدهای خود کار ساده تری داشته باشید</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <div className="w-12 h-12 bg-secondary text-[#776BB2] rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-4">
                ساده و کاربرپسند
              </h3>
              <p className="text-sm sm:text-sm md:text-base text-muted-foreground">
                رابط کاربری ساده و زیبا برای استفاده‌ی آسان و لذت‌بخش
              </p>
            </div>

            <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <div className="w-12 h-12 bg-secondary text-[#776BB2] rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-4">
                هوشمند و بروز
              </h3>
              <p className="text-sm sm:text-sm md:text-base text-muted-foreground">
                پلنت با استفاده از بروز ترین تکنولوژی ها ساخته شده تا بسیار بهینه باشه
              </p>
            </div>

            <div className="bg-card text-card-foreground rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <div className="w-12 h-12 bg-secondary text-[#776BB2] rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-4">
                دسترسی 24 ساعته
              </h3>
              <p className="text-sm sm:text-sm md:text-base text-muted-foreground">
                در هر زمان میتونید به برنامه خودتون دسترسی پیدا کنید اونم با چند کلیک ساده
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
