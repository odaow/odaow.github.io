
import React, { useState, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Services = React.lazy(() => import('./pages/Services'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Partners = React.lazy(() => import('./pages/Partners'));
const PartnerDetail = React.lazy(() => import('./pages/PartnerDetail'));
const Blog = React.lazy(() => import('./pages/Blog')); 
const BlogPostDetail = React.lazy(() => import('./pages/BlogPostDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Scroll to top on route change wrapper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Error Boundary
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

// Wrapper for transition and suspense to keep code DRY
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PageTransition>
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="w-8 h-8 border border-accent animate-spin" />
      </div>
    }>
      {children}
    </Suspense>
  </PageTransition>
);

// Inner component to handle routing logic with useLocation
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/partners" element={<PageWrapper><Partners /></PageWrapper>} />
        <Route path="/partners/:slug" element={<PageWrapper><PartnerDetail /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/blog/:id" element={<PageWrapper><BlogPostDetail /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          
          {/* Preloader Overlay */}
          <AnimatePresence>
            {isLoading && (
              <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
            )}
          </AnimatePresence>

          {/* Main Content Layout - Always rendered behind Preloader */}
          <Layout key="layout">
             <AnimatedRoutes />
          </Layout>
          
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
