import React, { createContext, useContext, useEffect, useState } from 'react';
import themeConfig from '../../data/theme.json';

type Theme = keyof typeof themeConfig.themes;

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
                themeAssets: themeConfig.themes[currentTheme].assets
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
