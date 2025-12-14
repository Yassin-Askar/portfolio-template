import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import Icon from '../ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

interface NavLink {
  name?: string;
  to?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = t?.general?.nav || [];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="hero" smooth={true} duration={500} className="text-2xl font-bold text-primary tracking-tighter">
              {t?.general?.logoText || 'Portfolio'}<span className="text-accent">.</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ltr:ml-10 rtl:mr-10 flex items-center space-x-8 rtl:space-x-reverse">
              {navLinks.map((link) => (
                link?.name && link?.to && (
                  <Link
                    key={link.name}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="text-muted-foreground hover:text-accent px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-accent p-2"
            >
              {isOpen ? <Icon name="X" size={24} /> : <Icon name="Menu" size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                link?.name && link?.to && (
                  <Link
                    key={link.name}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-accent block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

