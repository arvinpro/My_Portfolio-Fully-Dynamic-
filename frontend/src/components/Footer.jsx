import React from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/arvinpro",
      icon: Github,
      color: "from-gray-500/20 to-gray-600/30",
      hoverColor: "hover:from-gray-500/40 hover:to-gray-600/50",
      borderColor: "border-gray-400/30",
      shadowColor: "shadow-gray-500/20",
      hoverShadow: "hover:shadow-gray-500/40",
      ariaLabel: "Visit my GitHub profile"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/arvinjm04",
      icon: Linkedin,
      color: "from-blue-500/20 to-blue-600/30",
      hoverColor: "hover:from-blue-500/40 hover:to-blue-600/50",
      borderColor: "border-blue-400/30",
      shadowColor: "shadow-blue-500/20",
      hoverShadow: "hover:shadow-blue-500/40",
      ariaLabel: "Connect on LinkedIn"
    },
    {
      name: "Email",
      href: "mailto:jimdar900@gmail.com",
      icon: Mail,
      color: "from-purple-500/20 to-purple-600/30",
      hoverColor: "hover:from-purple-500/40 hover:to-purple-600/50",
      borderColor: "border-purple-400/30",
      shadowColor: "shadow-purple-500/20",
      hoverShadow: "hover:shadow-purple-500/40",
      ariaLabel: "Send me an email"
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/9779861140141",
      icon: FaWhatsapp,
      color: "from-green-500/20 to-green-600/30",
      hoverColor: "hover:from-green-500/40 hover:to-green-600/50",
      borderColor: "border-green-400/30",
      shadowColor: "shadow-green-500/20",
      hoverShadow: "hover:shadow-green-500/40",
      ariaLabel: "Message me on WhatsApp"
    },
    {
      name: "Telegram",
      href: "https://t.me/arvinpro",
      icon: FaTelegramPlane,
      color: "from-sky-500/20 to-sky-600/30",
      hoverColor: "hover:from-sky-500/40 hover:to-sky-600/50",
      borderColor: "border-sky-400/30",
      shadowColor: "shadow-sky-500/20",
      hoverShadow: "hover:shadow-sky-500/40",
      ariaLabel: "Message me on Telegram"
    },
    {
      name: "Phone",
      href: "tel:+9779861140141",
      icon: Phone,
      color: "from-indigo-500/20 to-indigo-600/30",
      hoverColor: "hover:from-indigo-500/40 hover:to-indigo-600/50",
      borderColor: "border-indigo-400/30",
      shadowColor: "shadow-indigo-500/20",
      hoverShadow: "hover:shadow-indigo-500/40",
      ariaLabel: "Call me"
    }
  ];

  return (
    <footer className="relative bg-gray-900/95 backdrop-blur-sm text-white py-8 sm:py-12 border-t border-white/10">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Left: Copyright and Credits */}
          <div className="text-center lg:text-left">
            <p className="text-sm sm:text-base text-gray-300 font-medium">
              © 2024 Arvin Jimdar Mahato. All Rights Reserved.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 flex items-center justify-center lg:justify-start">
              <span>Built with</span>
              <span className="mx-2 text-purple-400">React</span>
              <span className="text-gray-400">•</span>
              <span className="mx-2 text-blue-400">Tailwind CSS</span>
              <span className="text-gray-400">•</span>
              <span className="mx-2 text-pink-400">❤️</span>
            </p>
          </div>
          
          {/* Right: Enhanced Social Links with Glass-morphism */}
          <div className="relative">
            {/* Glass-morphism container */}
            <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl shadow-black/20">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl" />
              
              <div className="relative z-10 flex flex-wrap gap-3 justify-center">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith('http') ? "_blank" : undefined}
                      rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className={`
                        group relative w-12 h-12 sm:w-14 sm:h-14
                        bg-gradient-to-r ${social.color}
                        ${social.hoverColor}
                        rounded-xl
                        flex items-center justify-center
                        border ${social.borderColor}
                        ${social.shadowColor} ${social.hoverShadow}
                        transition-all duration-300
                        hover:scale-110 hover:-translate-y-1
                        min-h-[48px] min-w-[48px]
                        focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-opacity-50
                        backdrop-blur-sm
                      `}
                      aria-label={social.ariaLabel}
                      title={social.name}
                    >
                      {/* Icon */}
                      <IconComponent
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300`}
                      />
                      
                      {/* Hover glow effect */}
                      <div className={`
                        absolute inset-0 rounded-xl
                        bg-gradient-to-r ${social.color}
                        opacity-0 group-hover:opacity-20
                        transition-opacity duration-300 blur-md -z-10
                      `} />
                      
                      {/* Ripple effect on click */}
                      <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
                    </a>
                  );
                })}
              </div>
              
              {/* Border glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
            </div>
            
            {/* Platform labels for desktop hover */}
            <div className="hidden lg:block">
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gray-800/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg border border-white/20 whitespace-nowrap">
                  Connect with me
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom: Additional Links */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Made with passion for modern web development</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Performance optimized</span>
              <span>•</span>
              <span>Accessibility focused</span>
              <span>•</span>
              <span>Mobile responsive</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
