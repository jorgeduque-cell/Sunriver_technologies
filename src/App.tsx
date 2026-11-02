import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

// La home no carga nada del sitio anterior (Tailwind global, GSAP, three.js, chatbot).
// Las demás páginas se cargan bajo demanda con su layout de siempre.
const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const ServicesPage = lazy(() => import('./pages/Services'));
const MethodologyPage = lazy(() => import('./pages/Methodology'));
const ContactPage = lazy(() => import('./pages/Contact'));
const AboutPage = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Article = lazy(() => import('./pages/Article'));
const BlogCategory = lazy(() => import('./pages/BlogCategory'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        element={
          <Suspense fallback={null}>
            <MainLayout />
          </Suspense>
        }
      >
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/metodologia" element={<MethodologyPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/blog/categoria/:categoryId" element={<BlogCategory />} />
      </Route>
    </Routes>
  );
}

export default App;
