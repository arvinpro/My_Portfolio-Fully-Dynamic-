import React from "react";
import aboutimg from "./images/arvin.jpeg";

function About() {
  // Handle download - using the correct filename
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv/mycv.pdf';
    link.download = 'Arbin_Mahato_CV.pdf';
    link.click();
  };

  return (
    <div
      id="about"
      className="min-h-screen flex justify-center items-center bg-transparent px-4 sm:px-6 lg:px-8"
    >
      <section className="py-12 sm:py-16 lg:py-20 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Section */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 dark:text-white mb-4 sm:mb-6">
                About <span className="text-purple-500">Me</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                I'm a passionate web developer with a Bachelor's degree in BSc
                CSIT (Computer Science and Information Technology). I specialize
                in building full-stack web applications using the MERN stack
                (MongoDB, Express.js, React.js, Node.js).
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                My journey in tech began with a strong academic foundation in
                computer science, and over time, I've developed a keen interest
                in web development—crafting modern, responsive, and
                user-friendly applications.
              </p>

              {/* Skills Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8">
                {[
                  "Web Development",
                  "UI/UX Design",
                  "Mobile Apps",
                  "Responsive Design",
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Download Button */}
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 sm:px-8 bg-purple-500 hover:bg-purple-600 text-white text-sm sm:text-base font-medium rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 shadow-lg hover:shadow-xl cursor-not-allowed"
                  disabled
                >
                  <del>Download CV (PDF)</del>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="order-1 lg:order-2 w-full flex justify-center">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]">
                <img
                  src={aboutimg}
                  alt="Arvin Mahato - About Me"
                  className="w-full h-auto object-cover aspect-square"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/20 rounded-full backdrop-blur-sm"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-purple-400/20 rounded-full backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;