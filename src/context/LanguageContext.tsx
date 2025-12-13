import React, { createContext, useContext, useState, useEffect } from 'react';
import enData from '../locales/en.json';
import arData from '../locales/ar.json';
import deData from '../locales/de.json';
import config from '../config.json';

type Language = 'en' | 'ar' | 'de';
type Direction = 'ltr' | 'rtl';
type LocaleData = typeof enData;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    direction: Direction;
    t: LocaleData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('language');
            const validLanguages = config.languages.map(l => l.value);
            return (saved && validLanguages.includes(saved)) ? (saved as Language) : 'en';
        }
        return 'en';
    });

    const localeMap: Record<Language, LocaleData> = {
        en: enData,
        ar: arData,
        de: deData
    };

    const direction = language === 'ar' ? 'rtl' : 'ltr';
    const t = localeMap[language] || enData;

    useEffect(() => {
        document.documentElement.setAttribute('lang', language);
        document.documentElement.setAttribute('dir', direction);
        localStorage.setItem('language', language);
    }, [language, direction]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, direction, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
