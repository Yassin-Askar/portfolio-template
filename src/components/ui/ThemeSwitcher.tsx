import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme, availableThemes, themeAssets } = useTheme();
    const { t } = useLanguage();

    const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const currentIndex = availableThemes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % availableThemes.length;
        const nextTheme = availableThemes[nextIndex];

        // Fallback for browsers without View Transitions API
        if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
        }

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();

        // Center of the circle is center of the button
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Calculate distance to the furthest corner
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setTheme(nextTheme);
        });

        await transition.ready;

        // Animate the new view (circular reveal)
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 500,
                easing: 'ease-in-out',
                // pseudoElement is required for view transitions animation
                pseudoElement: '::view-transition-new(root)',
            }
        );
    };

    const getThemeIcon = () => {
        const iconName = themeAssets.lucideIcon || 'Moon';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Moon;
        return <IconComponent size={20} />;
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors text-primary"
            aria-label={t.general.toggleTheme}
        >
            {getThemeIcon()}
        </motion.button>
    );
};

export default ThemeSwitcher;
