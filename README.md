# Portfolio Template

A modern, high-performance portfolio template built with React, Next.js tech stack, and Tailwind CSS. Designed for software engineers to showcase their work effectively.

## Features

- ⚡ **High Performance** - Built with Vite for super fast development and building.
- 🎨 **Themable** - Includes multiple themes (Default, Eagle, Apple Glass) and easy customization.
- 📱 **Responsive** - Looks great on all devices.
- 🌍 **Internationalization** - Support for English and Arabic (RTL) out of the box.
- ♿ **Accessible** - Follows best practices for accessibility.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/portfolio-template.git
    cd portfolio-template
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Customization

### 1. Personal Content
Edit `src/locales/en.json` (and `ar.json` for Arabic) to update:
- Name, Title, Bio
- Social Links & Handles
- Experience, Education, Projects
- Skills

### 2. Assets
Replace the placeholder SVGs in the `public/` directory with your own images:
- `logo.svg` / `logo.png`
- `eagle-logo.svg` / `eagle-logo.png` (if using Eagle theme)
- `apple-glass-logo.svg` / `apple-glass-logo.png` (if using Apple Glass theme)

**Note:** If you use PNGs, make sure to update `src/theme.json` to point to the correct file extensions.

### 3. Themes
You can customize colors in `src/theme.json`.

## Deployment
This project is ready to be deployed on Vercel, Netlify, or GitHub Pages.

```bash
npm run build
```
