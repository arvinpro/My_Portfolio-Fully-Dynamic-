import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./Contact";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Admin.jsx";

function App() {
  return (
     <Router>
      <Routes>
        {/* Portfolio (Home) Page */}
        <Route
          path="/"
          element={
            <div className="bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] overflow-hidden">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
              <Footer />
            </div>
          }
        />

        {/* Admin Page */}
        <Route path="/admin" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
