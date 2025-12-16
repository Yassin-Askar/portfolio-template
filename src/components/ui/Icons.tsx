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
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!name) return;

        // Check if icon exists in mapping
        if (!iconPath) {
            console.warn(`Icon "${name}" is not defined in data/icons.json`);
            setError(true);
            return;
        }

        if (iconCache[name]) {
            setSvgContent(iconCache[name]);
            return;
        }

        fetch(iconPath)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.text();
            })
            .then(text => {
                // ... existing parser logic ...
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
                    throw new Error('Invalid SVG');
                }
            })
            .catch(err => {
                console.error(`Failed to load icon: ${name} from ${iconPath}`, err);
                setError(true);
            });
    }, [name, iconPath, size, className]);

    if (error || (!svgContent && !iconPath)) {
        return (
            <span
                style={{
                    width: size,
                    height: size,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fee2e2',
                    color: '#ef4444',
                    border: '1px border #fca5a5',
                    borderRadius: '4px',
                    fontSize: Math.max(10, size / 2),
                    fontWeight: 'bold',
                    cursor: 'help'
                }}
                title={`Missing icon: ${name}`}
            >
                ?
            </span>
        );
    }

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
