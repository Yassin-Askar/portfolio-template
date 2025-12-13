import { useState, useEffect } from 'react';
import iconsData from '../../../data/icons.json';

export type IconName = keyof typeof iconsData;

type IconProps = {
    name: string; // Allow string for flexible checking, but strictly should be IconName
    size?: number;
    className?: string;
};

// Simple memory cache
const iconCache: Record<string, string> = {};

const Icon = ({ name, size = 24, className = "" }: IconProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iconPath = (iconsData as any)[name];
    const [svgContent, setSvgContent] = useState<string | null>(iconCache[name] || null);

    useEffect(() => {
        if (!name || !iconPath) return;

        if (iconCache[name]) {
            setSvgContent(iconCache[name]);
            return;
        }

        fetch(iconPath)
            .then(res => res.text())
            .then(text => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'image/svg+xml');
                const svg = doc.querySelector('svg');
                if (svg) {
                    svg.setAttribute('width', size.toString());
                    svg.setAttribute('height', size.toString());
                    if (className) {
                        const existing = svg.getAttribute('class') || '';
                        svg.setAttribute('class', (existing + ' ' + className).trim());
                    }
                    const processed = svg.outerHTML;
                    iconCache[name] = processed;
                    setSvgContent(processed);
                } else {
                    iconCache[name] = text;
                    setSvgContent(text);
                }
            })
            .catch(err => console.error(`Failed to load icon: ${name}`, err));
    }, [name, iconPath, size, className]);

    if (!svgContent) {
        return <span style={{ width: size, height: size, display: 'inline-block' }} />;
    }

    return (
        <div
            style={{ display: 'contents' }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

export default Icon;
