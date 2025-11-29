# WelderDave Vue Netlify Starter


This repository hosts the WelderDave marketing site built with Vue 3 + Vite and configured for zero-config Netlify deployment. The source lives inside the `vue-netlify` directory.
This repository contains a small Vue 3 + Vite website that's already configured for a zero-config Netlify deployment. The source lives inside the `vue-netlify` directory.

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

## Contact delivery configuration

The contact form posts to a Netlify Function at `/.netlify/functions/send-contact`. Configure EmailJS delivery via environment variables so you can change recipients without editing code:

- `EMAILJS_SERVICE_ID` (required): EmailJS service ID.
- `EMAILJS_TEMPLATE_ID` (required): EmailJS template ID.
- `EMAILJS_PUBLIC_KEY` (required): Public key used for the EmailJS request.
- `EMAILJS_PRIVATE_KEY` (optional): Secret/access token if your EmailJS setup requires it.
- `EMAILJS_TO_EMAIL` (optional): Recipient email passed into your template via `to_email` if your template expects it.
- `VITE_CONTACT_ENDPOINT` (optional): Override the function endpoint if you route to a different delivery channel.

On Netlify, add these under **Site settings → Environment variables**. Locally, create a `.env` file inside `vue-netlify/` with the same variables for testing. The frontend will automatically disable the submit button while the request is in flight and display success/error feedback based on the function response.
