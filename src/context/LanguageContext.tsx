import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import config from '../../data/config.json';

// Automatically import ALL locale files from the locales folder using Vite's glob import
// Users only need to: 1) Add a JSON file to data/locales/ 2) Update config.json
// No source code changes required!
const localeModules = import.meta.glob('../../data/locales/*.json') as Record<
    string,
    () => Promise<{ default: Record<string, unknown> }>
>;

// Extract language code from file path (e.g., "../../data/locales/en.json" -> "en")
const getLanguageCode = (path: string): string => {
    const match = path.match(/\/([^/]+)\.json$/);
    return match ? match[1] : '';
};

// Build a map of language code -> loader function
const localeLoaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {};
for (const path in localeModules) {
    const langCode = getLanguageCode(path);
    if (langCode) {
        localeLoaders[langCode] = localeModules[path];
    }
}

type Direction = 'ltr' | 'rtl';

// Flexible type that allows any JSON structure - components handle missing data gracefully
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LocaleData = Record<string, any>;

interface LanguageConfig {
    label: string;
    value: string;
    rtl?: boolean;
}

interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    direction: Direction;
    t: LocaleData;
    availableLanguages: LanguageConfig[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Get available languages from config
const availableLanguages: LanguageConfig[] = config.languages || [];
const defaultLanguage = (config as { defaultLanguage?: string }).defaultLanguage || availableLanguages[0]?.value || 'en';

// Build RTL language set from config (languages with rtl: true)
const rtlLanguages = new Set(availableLanguages.filter(l => l.rtl).map(l => l.value));

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('language');
            const validLanguages = availableLanguages.map(l => l.value);
            return (saved && validLanguages.includes(saved)) ? saved : defaultLanguage;
        }
        return defaultLanguage;
    });

    const [locales, setLocales] = useState<Record<string, LocaleData>>({});
    const [isLoading, setIsLoading] = useState(true);

    // Load all locale files on mount
    useEffect(() => {
        const loadLocales = async () => {
            const loadedLocales: Record<string, LocaleData> = {};

            for (const lang of availableLanguages) {
                const loader = localeLoaders[lang.value];
                if (loader) {
                    try {
                        const module = await loader();
                        loadedLocales[lang.value] = module.default || module;
                    } catch (error) {
                        console.warn(`Failed to load locale: ${lang.value}`, error);
                        loadedLocales[lang.value] = {};
                    }
                } else {
                    console.warn(`No locale module found for: ${lang.value}`);
                    loadedLocales[lang.value] = {};
                }
            }

            setLocales(loadedLocales);
            setIsLoading(false);
        };

        loadLocales();
    }, []);

    const setLanguage = (lang: string) => {
        const validLanguages = availableLanguages.map(l => l.value);
        if (validLanguages.includes(lang)) {
            setLanguageState(lang);
        }
    };

    const direction: Direction = rtlLanguages.has(language) ? 'rtl' : 'ltr';

    // Get current locale, fallback to empty object if not loaded
    const t = useMemo(() => {
        return locales[language] || locales[defaultLanguage] || {};
    }, [locales, language]);

    useEffect(() => {
        document.documentElement.setAttribute('lang', language);
        document.documentElement.setAttribute('dir', direction);
        localStorage.setItem('language', language);
    }, [language, direction]);

    // Show nothing while loading locales to prevent flash
    if (isLoading) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, direction, t, availableLanguages }}>
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

