import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll'; // Alias to avoid conflict with 'Link' from react-router
import  {useGSAP} from '@gsap/react'
import gsap from "gsap";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['home', 'about', 'skills', 'projects', 'contact'];




 

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-neutral-900/95 backdrop-blur-sm shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <h1 className="text-xl sm:text-4xl lg:text-5xl font-great font-bold text-purple-500 tracking-wider text-shadow-lg hover:text-purple-400 transition-colors duration-300">Jimdar</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12 mr-4">
          {navItems.map((item) => (
            <ScrollLink
              key={item}
              to={item}
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              className="relative text-white text-lg lg:text-xl xl:text-4xl font-alum cursor-pointer hover:text-purple-400 transition-colors duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-purple-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 focus:rounded px-2 py-1"
            >
              {item.toUpperCase()}
            </ScrollLink>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:text-purple-400 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg hover:bg-neutral-800/50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900/95 backdrop-blur-sm border-t border-neutral-700 shadow-xl">
          <nav className="flex flex-col items-center py-4 space-y-2">
            {navItems.map((item) => (
              <ScrollLink
                key={item}
                to={item}
                smooth={true}
                duration={500}
                offset={-70}
                spy={true}
                className="w-full text-center py-3 text-white text-lg sm:text-xl font-semibold cursor-pointer hover:text-purple-400 hover:bg-neutral-800/50 transition-all duration-300 flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                {item.toUpperCase()}
              </ScrollLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
