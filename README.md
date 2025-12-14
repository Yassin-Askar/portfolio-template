# Portfolio Template

A modern, high-performance portfolio template built with **React**, **Vite**, and **Tailwind CSS**. Designed for software engineers to showcase their work effectively.

## Features

- ⚡ **High Performance** - Built with Vite for super fast development and building.
- 🎨 **Themable** - Includes multiple themes (Default, Eagle, Apple Glass) and easy customization.
- 📱 **Responsive** - Looks great on all devices.
- 🌍 **Internationalization** - Support for English, German, and Arabic (RTL) out of the box.
- 🔧 **Easy Configuration** - All content and settings are separated into JSON files.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-template.git
cd portfolio-template
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

## How to Use This Template

This template is designed to be easily customizable without touching the core code. All your data and configuration live in the `data/` directory.

### 1. Update Personal Content
Navigate to `data/locales/` to update the text content.
- Edit `en.json` for English content.
- Edit `de.json` for German content.
- Edit `ar.json` for Arabic content.

You can modify:
- **Hero Section**: Name, Title, Bio, Social Links.
- **Experience**: Your work history.
- **Education**: Your academic background.
- **Projects**: Your portfolio projects.
- **Contact**: Contact form labels, messages, and email address.

### 2. Configure General Settings
Edit `data/config.json` to toggle features and set global settings:
- `languages`: Configure available languages (English, German, Arabic).

### 3. Manage Icons
Icons are mapped in `data/icons.json`. This file maps icon names to their local SVG paths in the `public/icons/` directory.
- This is primarily used for **UI elements** and **Project icons**.
- Tech stack items in the `Skills` section are currently text-based.

### 4. Customize Themes
The look and feel are controlled by `data/theme.json`.
- **Colors**: Define your primary, secondary, and background colors.
- **Images**: Point to custom logo files.

### 5. Add Your Assets
Place your images in the `public/` directory.
- `public/logo.png` or `public/logo.svg`
- `public/favicon.png`

## Deployment

This project is optimized for deployment on Vercel, Netlify, or GitHub Pages.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
