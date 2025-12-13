import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundLines from './BackgroundLines';
import { ThemeProvider } from '../../context/ThemeContext';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans relative">
      <BackgroundLines />
      <Navbar />
      <main className="flex-grow pt-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LayoutContent>{children}</LayoutContent>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Layout;
