import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import ServicesPage from './pages/Services';
import MethodologyPage from './pages/Methodology';
import ContactPage from './pages/Contact';
import AboutPage from './pages/About';
import Blog from './pages/Blog';
import Article from './pages/Article';
import BlogCategory from './pages/BlogCategory';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/metodologia" element={<MethodologyPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/blog/categoria/:categoryId" element={<BlogCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
