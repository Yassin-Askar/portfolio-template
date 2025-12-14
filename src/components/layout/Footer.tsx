import { useState } from 'react';
import Icon from '../ui/Icons';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const hero = t?.hero;
  const footer = t?.footer;
  const email = hero?.social?.email;

  const handleCopyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} {hero?.name || 'Portfolio'}. {footer?.rights || 'All rights reserved.'}
            </p>
          </div>
          <div className="flex space-x-6">
            {hero?.social?.github && (
              <a href={hero.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Github" size={20} />
              </a>
            )}
            {hero?.social?.linkedin && (
              <a href={hero.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            )}
            {email && (
              <button
                onClick={handleCopyEmail}
                className="text-muted-foreground hover:text-primary transition-colors"
                title={hero?.copyEmailTooltip || ''}
              >
                {copied ? <Icon name="Check" size={20} /> : <Icon name="Mail" size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

