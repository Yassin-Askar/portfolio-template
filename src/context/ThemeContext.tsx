import React, { createContext, useContext, useEffect, useState } from 'react';
const FALLBACK_themeConfig = {
    defaultTheme: "default",
    themes: {
        "default": {
            assets: {
                "logo": "/logo.svg",
                "icon": "/logo.svg",
                "lucideIcon": "Moon"
            },
            "background": "#09090b",
            "foreground": "#fafafa",
            "card": "#09090b",
            "card-foreground": "#fafafa",
            "popover": "#09090b",
            "popover-foreground": "#fafafa",
            "primary": "#e7b910",
            "primary-foreground": "#18181b",
            "secondary": "#27272a",
            "secondary-foreground": "#fafafa",
            "muted": "#27272a",
            "muted-foreground": "#a1a1aa",
            "accent": "#db1436",
            "accent-foreground": "#fafafa",
            "destructive": "#7f1d1d",
            "destructive-foreground": "#fafafa",
            "border": "#27272a",
            "input": "#27272a",
            "ring": "#d4d4d8",
            "radius": "0.5rem"
        }
    }
};

// Use glob to import optionally (prevents build error if file is missing)
const themeModules = import.meta.glob('../../data/theme.json', { eager: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let themeConfig: any = Object.values(themeModules)[0] || FALLBACK_themeConfig;

// Ensure themeConfig has at least the default structure
// eslint-disable-next-line @typescript-eslint/no-explicit-any
themeConfig = (themeConfig as any).default || themeConfig;
if (!themeConfig.themes || !themeConfig.defaultTheme) {
    themeConfig = { ...FALLBACK_themeConfig, ...themeConfig };
}

type Theme = string; // Relaxed type to allow fallback handling without strict key checks against the JSON file

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    availableThemes: Theme[];
    themeAssets: {
        logo: string;
        icon: string;
        lucideIcon?: string;
    };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme && Object.keys(themeConfig.themes).includes(savedTheme)) {
                return savedTheme as Theme;
            }
        }
        return themeConfig.defaultTheme as Theme;
    });

    // Helper to convert Hex to HSL
    const hexToHSL = (hex: string) => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt("0x" + hex[1] + hex[1]);
            g = parseInt("0x" + hex[2] + hex[2]);
            b = parseInt("0x" + hex[3] + hex[3]);
        } else if (hex.length === 7) {
            r = parseInt("0x" + hex[1] + hex[2]);
            g = parseInt("0x" + hex[3] + hex[4]);
            b = parseInt("0x" + hex[5] + hex[6]);
        }
        r /= 255;
        g /= 255;
        b /= 255;
        const cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin;
        let h = 0, s = 0, l = 0;

        if (delta === 0) h = 0;
        else if (cmax === r) h = ((g - b) / delta) % 6;
        else if (cmax === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return `${h} ${s}% ${l}%`;
    };

    useEffect(() => {
        // Fallback to default if theme is missing from config
        if (!themeConfig.themes[currentTheme]) {
            console.warn(`Theme "${currentTheme}" is not defined in data/theme.json. Reverting to default.`);
            setCurrentTheme(themeConfig.defaultTheme as Theme);
            return;
        }

        const theme = themeConfig.themes[currentTheme];

        // Inject CSS variables
        Object.entries(theme).forEach(([key, value]) => {
            // Skip the assets object
            if (key === 'assets') return;

            // Handle color values
            if (typeof value === 'string') {
                const cssValue = value.startsWith('#') ? hexToHSL(value) : value;
                document.documentElement.style.setProperty(`--${key}`, cssValue);
            }
        });

        // Update Favicon
        if (theme.assets && theme.assets.icon) {
            const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
            if (favicon) {
                favicon.href = theme.assets.icon;
            }
        }

        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme: currentTheme,
                setTheme: setCurrentTheme,
                availableThemes: Object.keys(themeConfig.themes) as Theme[],
                themeAssets: themeConfig.themes[currentTheme]?.assets || themeConfig.themes[themeConfig.defaultTheme as Theme].assets
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
