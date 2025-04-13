import React from 'react';
import { FaGithub, FaInstagram, FaTelegram } from 'react-icons/fa';

export const AboutMe = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-16 text-right font-vazir">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <img
                  src="/src/public/images/IMG_4582.JPG"
                  alt="Profile"
                  className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-square"
                />
                <div className="absolute inset-0 rounded-2xl"></div>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-right">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-4">
                ایلیا دروار
              </h1>
              <p className="text-sm sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4">
                توسعه دهنده فول استک و طراح رابط کاربری
              </p>
              <div className="flex gap-4 justify-end">
                <a
                  href="https://github.com/ilyarevod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://t.me/QlmpFsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaTelegram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-card text-card-foreground rounded-2xl p-4 shadow-lg mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-3">
              درباره من
            </h2>
            <div className="prose max-w-none">
              <p className="text-sm sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                سلام! من ایلیا، یه برنامه نویس جونیور هستم که سعی داره چیزای جدید یاد بگیره و خلق بکنه. برای ارتباط با من میتونید از راه هایی که بالاتر گذاشتم استفاده بکنید
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card text-card-foreground rounded-2xl p-4 shadow-lg">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-4">
                مهارت‌های فنی
              </h2>
              <ul className="space-y-2 sm:space-y-4">
                <li className="flex items-center justify-between">
                  <span className="text-sm sm:text-sm md:text-base text-muted-foreground">React & TypeScript</span>
                  <div className="w-1/2 bg-muted rounded-full h-2">
                    <div className="bg-[#776BB2] h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm sm:text-sm md:text-base text-muted-foreground">Node.js & Express</span>
                  <div className="w-1/2 bg-muted rounded-full h-2">
                    <div className="bg-[#776BB2] h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm sm:text-sm md:text-base text-muted-foreground">UI/UX Design</span>
                  <div className="w-1/2 bg-muted rounded-full h-2">
                    <div className="bg-[#776BB2] h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm sm:text-sm md:text-base text-muted-foreground">Network</span>
                  <div className="w-1/2 bg-muted rounded-full h-2">
                    <div className="bg-[#776BB2] h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-card text-card-foreground rounded-2xl p-4 shadow-lg">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-card-foreground mb-2 sm:mb-4">
                تحصیلات و گواهینامه‌ها
              </h2>
              <ul className="space-y-4">
                <li className="border-r-2 border-[#776BB2] pr-4">
                  <h3 className="text-sm sm:text-sm md:text-base text-card-foreground">
                    دانشجوی مهندسی کامپیوتر
                  </h3>
                  <p className="text-sm sm:text-sm text-muted-foreground">دانشگاه نقش جهان، ۱۴۰۴-۱۴۰۳</p>
                </li>
                <li className="border-r-2 border-[#776BB2] pr-4">
                  <h3 className="text-sm sm:text-sm md:text-base text-card-foreground">
                    Harvard (CS50) - دانشگاه هاروارد
                  </h3>
                  <p className="text-sm sm:text-sm text-muted-foreground">CS50p (Python)</p>
                  {/* <p className="text-sm sm:text-sm text-muted-foreground">CS50a (AI)</p> */}
                  <p className="text-sm sm:text-sm text-muted-foreground">CS50x (Computer science)</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
