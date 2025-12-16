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
    const [failedLanguages, setFailedLanguages] = useState<string[]>([]);

    // Load all locale files on mount
    useEffect(() => {
        const loadLocales = async () => {
            const loadedLocales: Record<string, LocaleData> = {};
            const failures: string[] = [];

            for (const lang of availableLanguages) {
                const loader = localeLoaders[lang.value];
                if (loader) {
                    try {
                        const module = await loader();
                        loadedLocales[lang.value] = module.default || module;
                    } catch (error) {
                        console.warn(`Failed to load locale: ${lang.value}`, error);
                        loadedLocales[lang.value] = {};
                        failures.push(lang.value);
                    }
                } else {
                    console.warn(`No locale module found for: ${lang.value}`);
                    loadedLocales[lang.value] = {};
                    failures.push(lang.value);
                }
            }

            setLocales(loadedLocales);
            setFailedLanguages(failures);
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

    // Show error if current language failed to load
    if (failedLanguages.includes(language)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-900 p-8 text-center font-sans">
                <div className="max-w-xl mx-auto border-2 border-red-200 bg-white p-8 rounded-xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-4">⚠️ Configuration Error</h2>
                    <p className="text-lg mb-6">
                        The language <strong>"{language}"</strong> is listed in <code>data/config.json</code>,
                        but its translation file <code>data/locales/{language}.json</code> could not be found.
                    </p>
                    <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm font-mono mb-6">
                        <p className="mb-2 text-gray-600 font-bold">To fix this:</p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Check if <code>data/locales/{language}.json</code> exists.</li>
                            <li>Or remove the "{language}" entry from <code>data/config.json</code>.</li>
                        </ol>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        );
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

