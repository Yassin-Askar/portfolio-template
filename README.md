# Portfolio Template

## 👋 A Warm Welcome

Welcome! This is a modern portfolio template that I'm using, and you can easily use it too. It's designed for you to effortlessly modify the data and customize the theme to match your style.

<div align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

## 📸 Visual Tour

Here is a glimpse into the design and structure of the project:

<table width="100%">
  <tr>
    <td colspan="2">
      <img src="./img/s1v2.png" alt="Portfolio Screenshot 1" width="100%" /> 
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="./img/s2v2.png" alt="Portfolio Screenshot 2" width="100%" />
    </td>
    <td width="50%">
      <img src="./img/s3v2.png" alt="Portfolio Screenshot 3" width="100%" />
    </td>
  </tr>
</table>

<br />

## ✨ Key Features

- **🎨 Fully Customizable Themes**: The design is 100% editable. You can easily tweak existing styles or add completely new themes.
- **🌍 Dynamic Languages**: Built to be global. Add, update, or remove any language you want without complex coding.
- **📱 Mobile-First Design**: Responsive layouts that look great on any device, from phones to desktops.
- **🔧 Easy Content Management**: Update all your portfolio data (projects, skills, text) just by editing simple JSON files.

---

## 🚀 Getting Started

Want to run this locally? Follow these steps:

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

## 🛠️ Customization Guide

This template is configured entirely through JSON files, ensuring you never have to touch the complex code.

<pre>
data/
├── <b>config.json</b>       # ⚙️ Global settings (languages, etc.)
├── <b>theme.json</b>        # 🎨 Color palettes, fonts, logos
├── <b>meta.json</b>         # 🔍 SEO, defaults, and social media tags
├── <b>icons.json</b>        # 🧩 Icon name-to-file mappings
└── <b>locales/</b>          # 📝 All text content (one file per language)
    ├── en.json
    └── ...
</pre>

### ⚠️ Important: JSON Rules

**Don't Touch Keys:** Only edit the text on the right side of the colon (the values).


### 1. 🌍 Managing Languages
Control which languages your portfolio supports in `data/config.json`.

**To Add a New Language:**
1.  Add the language definition to the `languages` array in `data/config.json`:
    ```json
    { "label": "Spanish", "value": "es", "rtl": false }
    ```
2.  Duplicate `data/locales/en.json` and rename it to `es.json` (matching your value).
3.  Translate the content inside the new file.

> [!TIP]
> **To Remove a Language:** Simply delete the language object from `data/config.json`. You can optionally delete the file from `data/locales/` to keep things clean.

### 2. 🎨 Customizing Logos
Brand your portfolio by updating the assets in `data/theme.json`.

1.  Drop your logo file (e.g., `brand.svg`) into the `public/` directory.
2.  In `data/theme.json`, update the `logo` path for your active theme:
    ```json
    "assets": {
      "logo": "/brand.svg",
      ...
    }
    ```

### 3. 🧩 Managing Icons
We map icon names to files to keep usage simple.

1.  Save your SVG icon to `public/icons/` (e.g., `cool-icon.svg`).
2.  Register it in `data/icons.json`:
    ```json
    "CoolIcon": "/icons/cool-icon.svg"
    ```
3.  Use `"CoolIcon"` anywhere icons are supported in your data files.

### 4. 🔍 SEO & Metadata
Make the site truly yours by updating `data/meta.json`. This controls what shows up in Google search results and when sharing on social media.

- **Title & Description**: Your page title and summary.
- **Social Tags**: Open Graph (Facebook/LinkedIn) and Twitter card settings.
- **JSON-LD**: Structured data for rich search results.
- **Theme Color**: Browser toolbar color.


## 📦 Deployment

This project maps perfectly to modern hosting platforms like Vercel, Netlify, or GitHub Pages.

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```
