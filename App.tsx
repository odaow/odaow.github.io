import React, { useState, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Preloader from './components/Preloader';

// Lazy Load Pages to prevent large bundle blocking
const Home = React.lazy(() => import('./pages/Home'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Services = React.lazy(() => import('./pages/Services'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Partners = React.lazy(() => import('./pages/Partners'));
const PartnerDetail = React.lazy(() => import('./pages/PartnerDetail'));
const Blog = React.lazy(() => import('./pages/Blog')); 
const BlogPostDetail = React.lazy(() => import('./pages/BlogPostDetail')); // Added Detail Page
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Scroll to top on route change wrapper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-primary text-accent font-mono text-center p-4">
          <div>
            <h1 className="text-2xl font-bold mb-4">SYSTEM MALFUNCTION</h1>
            <p className="text-neutral-dim mb-4">The blueprint could not be rendered.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-accent hover:bg-accent hover:text-primary transition-colors"
            >
              RELOAD SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <AnimatePresence mode="wait">
            {isLoading ? (
              <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
            ) : (
              <Layout key="layout">
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center bg-primary">
                    <div className="w-8 h-8 border border-accent animate-spin" />
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/partners/:slug" element={<PartnerDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPostDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            )}
          </AnimatePresence>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;