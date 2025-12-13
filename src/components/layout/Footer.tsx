import { useState } from 'react';
import { Github, Linkedin, Mail, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(t.hero.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} {t.hero.name}. {t.footer.rights}
            </p>
          </div>
          <div className="flex space-x-6">
            <a href={t.hero.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href={t.hero.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <button
              onClick={handleCopyEmail}
              className="text-muted-foreground hover:text-primary transition-colors"
              title={t.hero.copyEmailTooltip}
            >
              {copied ? <Check size={20} /> : <Mail size={20} />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
