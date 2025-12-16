import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    {
      name: 'inject-metadata',
      transformIndexHtml(html) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const meta = require('./data/meta.json')
        return html
          .replace(/%TITLE%/g, meta.title)
          .replace(/%DESCRIPTION%/g, meta.description)
          .replace(/%KEYWORDS%/g, meta.keywords)
          .replace(/%AUTHOR%/g, meta.author)
          .replace(/%THEME_COLOR%/g, meta.themeColor)
          .replace(/%BASE_URL%/g, meta.baseUrl)
          .replace(/%OG_IMAGE%/g, meta.og.image)
          .replace(/%TWITTER_CARD%/g, meta.twitter.card)
          .replace(/%TWITTER_IMAGE%/g, meta.twitter.image)
          .replace(/%JSON_LD%/g, JSON.stringify(meta.jsonLd))
      },
    },
  ],
})
