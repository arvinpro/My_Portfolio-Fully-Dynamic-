import React from "react";
import ParticlesComponent from "./Particles";
import Header from "./Header";
import bg from "./images/deafult.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaDiscord, FaHandMiddleFinger } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link as ScrollLink } from "react-scroll";

function Hero() {
  useGSAP(() => {
    let tl = gsap.timeline();
  });

  const socialLinks = [
  { icon: FaFacebook, url: "https://www.facebook.com/aj.floo/" },
  { icon: FaInstagram, url: "https://instagram.com/mr.kaleyjimdar" },
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/arbin-mahato-4057ba277/" },
  { icon: FaDiscord, url: "https://discord.com/1371131504142585956" },
  { icon: FaGithub, url: "https://github.com/arvinpro" },
];


  return (
    <div
      id="home"
      className="relative min-h-screen w-full border-3 border-transparent shadow-2xl rounded-4xl"
    >
      <div className="absolute inset-0 z-0">
        <ParticlesComponent />
      </div>

      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      <div className="relative z-10 text-white min-h-[calc(100vh-80px)] flex flex-col lg:flex-row justify-center items-center px-4 sm:px-6 md:px-10 py-20 lg:py-0">
        <div
          id="text"
          className="w-full lg:w-1/2 text-center mb-10 lg:mb-0 lg:px-8"
        >
          <h1 className="font-alum text-2xl sm:text-3xl md:text-4xl">
            HELLO <span className="text-purple-500 ">WELCOME !</span>
          </h1>
          <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3">
            I'M ARVIN <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MAHATO</span>
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3">
           Full-Stack <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">DEVELOPER</span>
          </h1>
          <h1 className="max-w-2xl mx-auto mt-4 text-lg sm:text-xl md:text-2xl">
            Crafting Inovative Softwares With MERN Technologies.
          </h1>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 mb-8">
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
              <button className="w-44 cursor-pointer rounded-xl px-6 py-3 bg-purple-500 text-white text-lg hover:bg-purple-600 hover:scale-105 transform transition duration-300">
                HIRE ME
              </button>
            </ScrollLink>
            <ScrollLink to="skills" smooth={true} duration={500} offset={-70}>
              <button className="w-44 cursor-pointer rounded-xl px-6 py-3 border-2 border-purple-500 text-lg hover:bg-purple-500 hover:scale-105 transform transition duration-300">
                My Skills
              </button>
            </ScrollLink>
          </div>

          <div
  id="txt"
  className="txt-scroll flex flex-wrap justify-center gap-5 mt-8"
>
  {socialLinks.map(({ icon: Icon, url }, index) => (
    <a
      key={index}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-800 rounded-full flex items-center justify-center text-white hover:bg-purple-500 hover:scale-110 transform transition duration-300 shadow-lg"
    >
      <Icon className="text-xl sm:text-2xl" />
    </a>
  ))}
</div>

        </div>

        {/* Image wrapper with responsive styling */}
        <div className="img-scroll relative w-48 h-48 sm:w-64  sm:h-64 md:w-80 md:h-80 lg:w-auto lg:h-screen lg:mr-0 fade-shadow-right fade-left">
          <img
            id="img"
            src={bg}
            alt="Profile"
            className="h-full w-full object-cover rounded-full lg:rounded-none border-4 lg:border-0 border-purple-500/50 shadow-lg lg:shadow-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
