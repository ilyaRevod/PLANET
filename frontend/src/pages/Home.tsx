import { Link } from 'react-router-dom';
import projectImage from '../public/images/PLANET(4).jpg';
import imageee from '../public/images/image.png';
import bezoodi from '../public/images/بزودی(2).jpg';
import ilyaa from '../public/images/ilyaaaa.jpg';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-right min-h-[calc(100vh-42px)] transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
        {/* Left Column with Main Section and Small Sections */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Large Left Section */}
          <Link to="/about-project" className="block">
            <div className="relative overflow-hidden rounded-2xl group h-[50vh] transition-colors duration-300">
              <img
                src={projectImage}
                alt="Project Banner"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent">
                <div className="absolute bottom-0 right-0 p-8 text-white">
                  <h2 className="text-xl font-vazir_bold mb-4">پلنت چیه؟</h2>
                  <p className="font-vazir text-sm opacity-90">
                    پلنت یک پلتفرم برای کمک به دانشجویان است تا در مدیریت ... بیشتر بخوانید
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Bottom Small Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* About Me Section */}
            <Link to="/schedule">
              <div className="relative overflow-hidden rounded-xl group h-[25vh]">
                <img
                  src={imageee}
                  alt="About Me"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-vazir_bold">برنامه هفتگی</h3>
                  </div>
                </div>
              </div>
            </Link>

            {/* About Planet Section */}
            <Link to="#">
              <div className="relative overflow-hidden rounded-xl group h-[25vh]">
                <img
                  src={bezoodi}
                  alt="About Planet"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-vazir_bold">برنامه انتخاب واحد</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Large Right Section - Full Height */}
        <div className="lg:col-span-1">
          <Link to="/about-me" className="block h-full">
            <div className="relative overflow-hidden rounded-2xl group h-[calc(75vh+1.5rem)]">
              <img
                src={ilyaa}
                alt="About me"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 right-0 p-6 text-white">
                  <h2 className="text-xl sm:text-2xl font-vazir_bold mb-3">درباره من</h2>
                  <p className="font-vazir text-sm opacity-90">
                    سلام! من ایلیا هستم جهت ارتباط ... بیشتر بخوانید
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
