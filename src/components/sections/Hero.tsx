import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../ui/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const { themeAssets } = useTheme();
  const { t } = useLanguage();

  const hero = t?.hero;

  const handleCopyEmail = () => {
    if (hero?.social?.email) {
      navigator.clipboard.writeText(hero.social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background elements */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="text-center md:text-start md:flex md:items-center md:justify-between">
          <div className="md:w-3/5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {hero?.greeting && <h2 className="text-xl text-accent font-medium mb-2">{hero.greeting}</h2>}
              {hero?.name && (
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
                  {hero.name}
                </h1>
              )}
              {(hero?.title || hero?.subtitle) && (
                <h3 className="text-2xl md:text-3xl text-muted-foreground font-medium">
                  {hero?.title}
                  {hero?.subtitle && <span className="block md:inline text-primary"> | {hero.subtitle}</span>}
                </h3>
              )}
            </motion.div>

            {hero?.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
              >
                {hero.description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
            >
              {hero?.ctaButton && (
                <a href="#contact" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">
                  {hero.ctaButton}
                </a>
              )}
              <div className="flex items-center gap-4 px-4">
                {hero?.social?.github && (
                  <a href={hero.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors p-2 hover:bg-accent/10 rounded-full">
                    <Icon name="Github" size={24} />
                  </a>
                )}
                {hero?.social?.linkedin && (
                  <a href={hero.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors p-2 hover:bg-accent/10 rounded-full">
                    <Icon name="Linkedin" size={24} />
                  </a>
                )}
                {hero?.social?.email && (
                  <button
                    onClick={handleCopyEmail}
                    className="text-muted-foreground hover:text-accent transition-colors p-2 hover:bg-accent/10 rounded-full"
                    title={hero?.copyEmailTooltip || ''}
                  >
                    {copied ? <Icon name="Check" size={24} /> : <Icon name="Mail" size={24} />}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Optional: Add personal image or abstract graphic here */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block md:w-2/5 mt-12 md:mt-0 relative"
          >
            <div className="relative w-72 h-72 md:w-[30rem] md:h-[30rem] mx-auto">

              <motion.div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={themeAssets.logo}
                  alt={`${hero?.name || 'Portfolio'} Logo`}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

