<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

 # LexiPro Forensic OS — Static Demo Site (GitHub Pages Ready)

This repo is a Vite + React + TypeScript single-page site. It is preconfigured to deploy to **GitHub Pages** automatically.

## 🚀 Deploy to GitHub Pages (Drag & Drop)

1) Create a new GitHub repository (public).
2) Upload/drag-drop **all files and folders** from this project into the repo (root).
3) In GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4) The included workflow (`.github/workflows/deploy-pages.yml`) will build and deploy on every push to `main`.

## 🔑 Live Gemini Analysis

This is a **static** site. For live Gemini analysis, click **“Set API Key”** in the navbar and paste your Gemini API key.

✅ The key is stored **only in your browser** (localStorage).  
❌ Do **not** commit API keys to GitHub.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (Optional) For local development you can set `VITE_GEMINI_API_KEY` in `.env.local`
3. Run:
   `npm run dev`
