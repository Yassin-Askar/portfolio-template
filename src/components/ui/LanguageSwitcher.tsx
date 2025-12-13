import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Check, ChevronsUpDown } from 'lucide-react';
import config from '../../config.json';
import { cn } from '../../lib/utils';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const languages = config.languages;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors text-primary border border-transparent hover:border-border"
                aria-expanded={open}
            >
                <Languages size={18} />
                <span className="text-sm font-medium uppercase">{language}</span>
                <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 5 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 top-full z-50 w-[160px] rounded-md border bg-popover text-popover-foreground shadow-md p-1"
                    >
                        <div className="flex flex-col gap-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.value}
                                    onClick={() => {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        setLanguage(lang.value as any);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "flex items-center justify-between px-2 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors w-full text-start",
                                        language === lang.value && "bg-accent/50"
                                    )}
                                >
                                    <span>{lang.label}</span>
                                    {language === lang.value && <Check size={14} className="text-primary" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
