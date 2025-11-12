import {
  AlertCircle,
  CheckCircle,
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
} from "lucide-react"; // Icons
import { useState } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import api from "./utils/api";
import React from "react";


function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  // Validation functions
  const validateName = (value) => {
    if (!value.trim()) {
      return "Name is required";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateMessage = (value) => {
    if (!value.trim()) {
      return "Message is required";
    }
    if (value.trim().length < 10) {
      return "Message must be at least 10 characters long";
    }
    if (value.trim().length > 1000) {
      return "Message must be less than 1000 characters";
    }
    return "";
  };

  // Real-time validation
  const validateField = (field, value) => {
    switch (field) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "message":
        return validateMessage(value);
      default:
        return "";
    }
  };

  const handleFieldChange = (field, value) => {
    // Update field value
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
    }

    // Clear previous submit status
    if (submitStatus.type) {
      setSubmitStatus({ type: "", message: "" });
    }

    // Real-time validation if field has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleFieldBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = field === "name" ? name : field === "email" ? email : message;
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleformSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    const formData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    try {
      const response = await api.post("/api/contact", formData);

      if (response.status === 200) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! I will get back to you soon.",
        });
        setName("");
        setEmail("");
        setMessage("");
        setTouched({});
        setErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: "Failed to send message. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      setSubmitStatus({
        type: "error",
        message:
          "Failed to send message. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="py-12 sm:py-16 lg:py-20 relative">
        {/* Background gradient overlay for enhanced glass-morphism harmony */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-gray-900/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
              Contact{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Let's work together! Feel free to reach out for any project or
              collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Contact Info - Enhanced Glass-morphism */}
            <div className="space-y-6 sm:space-y-8">
              <div className="relative">
                {/* Glass-morphism container with enhanced effects */}
                <div className="relative group">
                  {/* Main glass card */}
                  <div className="relative bg-white/10 dark:bg-gray-800/20 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-2xl shadow-black/20">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/5 rounded-3xl" />

                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rounded-3xl" />

                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Get in Touch
                        </span>
                      </h3>

                      <div className="space-y-3 sm:space-y-4">
                        <a
                          href="tel:+9779861140141"
                          className="group/contact flex items-center space-x-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 min-h-[56px]"
                        >
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-purple-600/30 rounded-full flex items-center justify-center group-hover/contact:from-purple-500/40 group-hover/contact:to-purple-600/50 transition-all duration-300 border border-purple-400/30">
                              <Phone className="text-purple-300 w-5 h-5" />
                            </div>
                            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 group-hover/contact:text-gray-300 transition-colors">
                              Phone
                            </p>
                            <p className="text-white font-medium group-hover/contact:text-purple-200 transition-colors">
                              +977-9861140141
                            </p>
                          </div>
                        </a>

                        <a
                          href="mailto:jimdar900@gmail.com"
                          className="group/contact flex items-center space-x-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 min-h-[56px]"
                        >
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-purple-600/30 rounded-full flex items-center justify-center group-hover/contact:from-purple-500/40 group-hover/contact:to-purple-600/50 transition-all duration-300 border border-purple-400/30">
                              <Mail className="text-purple-300 w-5 h-5" />
                            </div>
                            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 group-hover/contact:text-gray-300 transition-colors">
                              Email
                            </p>
                            <p className="text-white font-medium group-hover/contact:text-purple-200 transition-colors">
                              jimdar900@gmail.com
                            </p>
                          </div>
                        </a>

                        <a
                          href="https://github.com/arvinpro"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/contact flex items-center space-x-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 min-h-[56px]"
                        >
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-gray-500/20 to-gray-600/30 rounded-full flex items-center justify-center group-hover/contact:from-gray-500/40 group-hover/contact:to-gray-600/50 transition-all duration-300 border border-gray-400/30">
                              <Github className="text-gray-300 w-5 h-5" />
                            </div>
                            <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-md opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 group-hover/contact:text-gray-300 transition-colors">
                              GitHub
                            </p>
                            <p className="text-white font-medium group-hover/contact:text-purple-200 transition-colors">
                              arvinpro
                            </p>
                          </div>
                        </a>

                        <a
                          href="https://wa.me/9779861140141"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/contact flex items-center space-x-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-400/30 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20 min-h-[56px]"
                        >
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-green-600/30 rounded-full flex items-center justify-center group-hover/contact:from-green-500/40 group-hover/contact:to-green-600/50 transition-all duration-300 border border-green-400/30">
                              <FaWhatsapp className="text-green-300 w-5 h-5" />
                            </div>
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 group-hover/contact:text-gray-300 transition-colors">
                              WhatsApp
                            </p>
                            <p className="text-white font-medium group-hover/contact:text-green-200 transition-colors">
                              Message me
                            </p>
                          </div>
                        </a>

                        <a
                          href="https://linkedin.com/in/arvinjm04"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/contact flex items-center space-x-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 min-h-[56px]"
                        >
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/30 rounded-full flex items-center justify-center group-hover/contact:from-blue-500/40 group-hover/contact:to-blue-600/50 transition-all duration-300 border border-blue-400/30">
                              <Linkedin className="text-blue-300 w-5 h-5" />
                            </div>
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 group-hover/contact:text-gray-300 transition-colors">
                              LinkedIn
                            </p>
                            <p className="text-white font-medium group-hover/contact:text-blue-200 transition-colors">
                              arvinjm04
                            </p>
                          </div>
                        </a>

                        <a
                          href="https://t.me/arvinpro"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/contact flex items-center space-x-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:border-sky-400/30 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/20 min-h-[56px]"
                        >
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-sky-500/20 to-sky-600/30 rounded-full flex items-center justify-center group-hover/contact:from-sky-500/40 group-hover/contact:to-sky-600/50 transition-all duration-300 border border-sky-400/30">
                              <FaTelegramPlane className="text-sky-300 w-5 h-5" />
                            </div>
                            <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-md opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 group-hover/contact:text-gray-300 transition-colors">
                              Telegram
                            </p>
                            <p className="text-white font-medium group-hover/contact:text-sky-200 transition-colors">
                              @arvinpro
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Enhanced border glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form - Enhanced Glass-morphism */}
            <div className="relative">
              <div className="relative group">
                {/* Main glass card */}
                <div className="relative bg-white/10 dark:bg-gray-800/20 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-2xl shadow-black/20">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/5 rounded-3xl" />

                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent rounded-3xl" />

                  <div className="relative z-10">
                    {/* Status Message */}
                    {submitStatus.type && (
                      <div
                        className={`mb-6 p-4 rounded-2xl flex items-center space-x-3 ${
                          submitStatus.type === "success"
                            ? "bg-green-500/20 border border-green-400/30 text-green-200"
                            : "bg-red-500/20 border border-red-400/30 text-red-200"
                        }`}
                      >
                        {submitStatus.type === "success" ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className="text-sm font-medium">
                          {submitStatus.message}
                        </span>
                      </div>
                    )}

                    <form
                      onSubmit={handleformSubmit}
                      className="space-y-5 sm:space-y-6"
                    >
                      {/* Name Field */}
                      <div className="group/input">
                        <label className="block text-white mb-3 text-sm sm:text-base font-medium">
                          Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            value={name}
                            onChange={(e) =>
                              handleFieldChange("name", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("name")}
                            type="text"
                            placeholder="Your Name"
                            className={`w-full p-4 sm:p-5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base min-h-[52px] group-hover/input:bg-white/15 ${
                              errors.name && touched.name
                                ? "border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50"
                                : !errors.name && touched.name
                                ? "border-green-400/50 focus:ring-green-400/50 focus:border-green-400/50"
                                : "border-white/20 dark:border-white/10 focus:ring-purple-400/50 focus:border-purple-400/50"
                            }`}
                          />
                          {/* Validation Icon */}
                          {touched.name && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              {errors.name ? (
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              ) : name ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : null}
                            </div>
                          )}
                          {/* Input glow effect */}
                          <div
                            className={`absolute inset-0 rounded-2xl opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 -z-10 blur-md ${
                              errors.name && touched.name
                                ? "bg-red-500/20"
                                : !errors.name && touched.name
                                ? "bg-green-500/20"
                                : "bg-purple-500/20"
                            }`}
                          />
                        </div>
                        {/* Error Message */}
                        {errors.name && touched.name && (
                          <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="group/input">
                        <label className="block text-white mb-3 text-sm sm:text-base font-medium">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            value={email}
                            onChange={(e) =>
                              handleFieldChange("email", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("email")}
                            type="email"
                            placeholder="you@example.com"
                            className={`w-full p-4 sm:p-5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base min-h-[52px] group-hover/input:bg-white/15 ${
                              errors.email && touched.email
                                ? "border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50"
                                : !errors.email && touched.email
                                ? "border-green-400/50 focus:ring-green-400/50 focus:border-green-400/50"
                                : "border-white/20 dark:border-white/10 focus:ring-purple-400/50 focus:border-purple-400/50"
                            }`}
                          />
                          {/* Validation Icon */}
                          {touched.email && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              {errors.email ? (
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              ) : email ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : null}
                            </div>
                          )}
                          {/* Input glow effect */}
                          <div
                            className={`absolute inset-0 rounded-2xl opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 -z-10 blur-md ${
                              errors.email && touched.email
                                ? "bg-red-500/20"
                                : !errors.email && touched.email
                                ? "bg-green-500/20"
                                : "bg-purple-500/20"
                            }`}
                          />
                        </div>
                        {/* Error Message */}
                        {errors.email && touched.email && (
                          <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div className="group/input">
                        <label className="block text-white mb-3 text-sm sm:text-base font-medium">
                          Message <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            value={message}
                            onChange={(e) =>
                              handleFieldChange("message", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("message")}
                            rows={5}
                            placeholder="Your message..."
                            className={`w-full p-4 sm:p-5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base resize-none group-hover/input:bg-white/15 ${
                              errors.message && touched.message
                                ? "border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50"
                                : !errors.message && touched.message
                                ? "border-green-400/50 focus:ring-green-400/50 focus:border-green-400/50"
                                : "border-white/20 dark:border-white/10 focus:ring-purple-400/50 focus:border-purple-400/50"
                            }`}
                          />
                          {/* Character Count */}
                          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                            {message.length}/1000
                          </div>
                          {/* Validation Icon */}
                          {touched.message && (
                            <div className="absolute right-4 top-2">
                              {errors.message ? (
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              ) : message ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : null}
                            </div>
                          )}
                          {/* Textarea glow effect */}
                          <div
                            className={`absolute inset-0 rounded-2xl opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 -z-10 blur-md ${
                              errors.message && touched.message
                                ? "bg-red-500/20"
                                : !errors.message && touched.message
                                ? "bg-green-500/20"
                                : "bg-purple-500/20"
                            }`}
                          />
                        </div>
                        {/* Error Message */}
                        {errors.message && touched.message && (
                          <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.message}</span>
                          </p>
                        )}
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`group/btn relative w-full min-h-[52px] flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 font-medium text-sm sm:text-base shadow-lg ${
                            isSubmitting
                              ? "bg-gray-600 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 hover:scale-[1.02] focus:ring-purple-400/50 shadow-purple-500/25"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              <span className="relative z-10">Sending...</span>
                            </>
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                              <Send className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                              <span className="relative z-10">
                                Send Message
                              </span>
                            </>
                          )}

                          {/* Button glow effect */}
                          {!isSubmitting && (
                            <div className="absolute inset-0 bg-purple-500/20 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-md" />
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Enhanced border glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
