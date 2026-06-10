# react-invoice

Generate a styled invoice PDF with `@react-pdf/renderer` and preview it in a browser using Vite.

## Features

- Reusable React PDF invoice component
- Scripted PDF generation to `invoice.pdf`
- Browser preview page with:
  - embedded PDF viewer
  - local PDF upload
  - open-in-new-tab action

## Prerequisites

- Node.js 18+

## Install

```bash
npm install
```

## Available Scripts

```bash
npm run build:invoice
```

Generates `invoice.pdf` in the project root.

```bash
npm run dev
```

Starts the Vite development server for web preview.

## Typical Workflow

1. Generate the latest invoice PDF:

   ```bash
   npm run build:invoice
   ```

2. Start the web preview:

   ```bash
   npm run dev
   ```

3. Open the local URL shown by Vite (usually `http://127.0.0.1:5173`).

The viewer loads bundled `invoice.pdf` by default, and you can also pick any local PDF from the UI.

## Project Structure

- `src/InvoicePdf.tsx` - reusable invoice PDF component
- `src/example.tsx` - example data + PDF generation script
- `src/main.tsx` - web PDF viewer app
- `invoice.pdf` - generated output file
- `.gitignore` - ignored files for dependencies, build artifacts, caches, and logs
