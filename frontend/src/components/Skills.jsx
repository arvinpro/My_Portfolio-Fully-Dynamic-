import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link as ScrollLink } from "react-scroll";

function Skills() {
  const skillsRef = useRef(null);
  const cardsRef = useRef([]);

  // Enhanced GSAP animations for skill cards
  useGSAP(
    () => {
      if (!skillsRef.current) return;

      // Animate progress bars
      const progressBars = document.querySelectorAll(".progress-bar");
      progressBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        if (width) {
          gsap.to(bar, {
            width: width,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.5,
          });
        }
      });

      // Animate skill cards on scroll
      gsap.fromTo(
        cardsRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      );
    },
    { scope: skillsRef }
  );

  // Enhanced skill data with TypeScript and Next.js
  const skills = [
    {
      name: "HTML5",
      icon: "html5/html5-original.svg",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "CSS3",
      icon: "css3/css3-original.svg",
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "JavaScript",
      icon: "javascript/javascript-original.svg",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "TypeScript",
      icon: "typescript/typescript-original.svg",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "React.js",
      icon: "react/react-original.svg",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Next.js",
      icon: "nextjs/nextjs-original.svg",
      color: "from-gray-800 to-gray-900",
    },
    {
      name: "Tailwind",
      icon: "tailwindcss/tailwindcss-plain.svg",
      color: "from-teal-500 to-cyan-500",
    },
    {
      name: "Node.js",
      icon: "nodejs/nodejs-original.svg",
      color: "from-green-500 to-green-700",
    },
    {
      name: "Express",
      icon: "express/express-original.svg",
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "MongoDB",
      icon: "mongodb/mongodb-original.svg",
      color: "from-green-600 to-green-800",
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden"
      ref={skillsRef}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
              My{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Here are the technologies and tools I work with regularly to build
              modern, responsive applications with cutting-edge performance and
              user experience.
            </p>
          </div>

          {/* Enhanced Skill Icons Grid */}
          <div className="mb-16 sm:mb-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group relative"
                >
                  {/* Skill Card */}
                  <div className="relative p-4 sm:p-5 lg:p-6 bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] flex flex-col items-center justify-center border border-white/20 hover:border-purple-400/50">
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500 blur-xl`}
                    />

                    {/* Icon Container */}
                    <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-2 sm:mb-3">
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}`}
                        alt={skill.name}
                        className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 transition-all duration-300 group-hover:scale-110 object-contain filter drop-shadow-lg"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback for missing icons
                          e.target.style.display = "none";
                          const fallback = document.createElement("div");
                          fallback.className =
                            "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm";
                          fallback.textContent = skill.name.substring(0, 2);
                          e.target.parentNode.appendChild(fallback);
                        }}
                      />
                    </div>

                    {/* Skill Name */}
                    <h3 className="relative z-10 text-xs sm:text-sm lg:text-base font-semibold text-white text-center leading-tight group-hover:text-purple-200 transition-colors duration-300">
                      {skill.name}
                    </h3>

                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-500">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Hover Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500" />
                      <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-700 delay-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Skill Progress Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-8 sm:mb-10 text-center">
              Skill <span className="text-purple-400">Proficiency</span>
            </h3>

            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  label: "Frontend Development",
                  percent: "92%",
                  description:
                    "React, Next.js, TypeScript, HTML5, CSS3, Tailwind CSS",
                  color: "from-cyan-500 to-blue-600",
                },
                {
                  label: "Backend Development",
                  percent: "85%",
                  description: "Node.js, Express, MongoDB, API Development",
                  color: "from-green-500 to-emerald-600",
                },
                {
                  label: "UI/UX Design",
                  percent: "78%",
                  description:
                    "Responsive Design, User Experience, Modern Interfaces",
                  color: "from-purple-500 to-pink-600",
                },
                {
                  label: "TypeScript & Next.js",
                  percent: "88%",
                  description:
                    "Type Safety, Server-Side Rendering, Modern Development",
                  color: "from-blue-600 to-indigo-700",
                },
              ].map(({ label, percent, description, color }) => (
                <div key={label} className="group">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4">
                    <div className="mb-2 lg:mb-0">
                      <h4 className="text-lg sm:text-xl font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
                        {label}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-400 mt-1 leading-relaxed max-w-2xl">
                        {description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg sm:text-xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        {percent}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                      <div
                        className={`progress-bar h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
                        style={{ width: "0%" }}
                        data-width={percent}
                      >
                        {/* Animated shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer" />
                      </div>
                    </div>

                    {/* Progress glow effect */}
                    <div
                      className={`absolute top-0 left-0 h-3 bg-gradient-to-r ${color} rounded-full blur-sm opacity-30 transition-all duration-1000 ease-out`}
                      style={{ width: "0%" }}
                      data-width={percent}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              Ready to bring these skills to your next project?
            </p>

            <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
              <button className="group relative px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50">
                <span className="relative z-10">Let's Work Together</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </ScrollLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
