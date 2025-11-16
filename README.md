# WelderDave Vue Netlify Starter

This repository hosts the WelderDave marketing site built with Vue 3 + Vite and configured for zero-config Netlify deployment. The source lives inside the `vue-netlify` directory.

## Getting started

```bash
cd vue-netlify
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Deploying to Netlify

The included `netlify.toml` instructs Netlify to run `npm install && npm run build` inside the `vue-netlify` directory and publish the generated `dist` folder.
